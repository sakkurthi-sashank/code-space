import { supabase } from '@/lib/supabase'
import { useUserProfileStore } from '@/store/userProfileStore'
import { Button, FileInput, Modal, Stack, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { IconUpload } from '@tabler/icons-react'
import { useState } from 'react'

export const UpdateUserProfile = ({
  opened,
  close,
}: {
  opened: boolean
  close: () => void
}) => {
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null)
  const [profileImage, setProfileImage] = useState<File | null>(null)

  const { userProfile } = useUserProfileStore((state) => ({
    userProfile: state.userProfile,
  }))

  const form = useForm({
    initialValues: {
      first_name: '',
      last_name: '',
      admission_number: '',
      phone_number: '',
      batch: '',
      branch: '',
      gender: '',
      date_of_birth: '',
      background_image: '',
      profile_image: '',
      loading: false,
    },
    validate: {
      first_name: (value) => value.length >= 3 && value.length <= 20,
      last_name: (value) => value.length >= 3 && value.length <= 20,
      admission_number: (value) => /^Ap\d{11}$/.test(value),
      phone_number: (value) => /^\d{10}$/.test(value),
      batch: (value) => value.length >= 3 && value.length <= 20,
      branch: (value) => value.length >= 3 && value.length <= 20,
      gender: (value) => /^(male|female|other)$/i.test(value),
      date_of_birth: (value) => {
        const date = new Date(value)
        const now = new Date()

        return date.getTime() < now.getTime()
      },
    },
  })

  const handleUpdateUserProfile = async () => {
    form.setFieldValue('loading', true)

    if (!form.isValid) {
      form.setFieldValue('loading', false)
      return
    }

    const data = {
      id: userProfile?.id!,
      admission_number: form.values.admission_number,
      first_name: form.values.first_name,
      last_name: form.values.last_name,
      phone_number: form.values.phone_number,
      batch: form.values.batch,
      branch: form.values.branch,
      date_of_birth: form.values.date_of_birth,
      gender: form.values.gender,
      background_image: '',
      profile_image: '',
    }

    try {
      if (backgroundImage) {
        const { data: bgData } = await supabase.storage
          .from('profile-background')
          .upload(`profile-background/${backgroundImage.name}`, backgroundImage)

        data.background_image = supabase.storage
          .from('profile-background')
          .getPublicUrl(bgData?.path!)!.data.publicUrl
      }

      if (profileImage) {
        const { data: profileData } = await supabase.storage
          .from('profile-image')
          .upload(`profile-image/${profileImage.name}`, profileImage)

        data.profile_image = supabase.storage
          .from('profile-image')
          .getPublicUrl(profileData?.path!)!.data.publicUrl
      }

      const { data: updateData } = await supabase
        .from('Profile')
        .upsert(data)
        .select('*')

      if (updateData) {
        form.setFieldValue('loading', false)
        close()
      }

      form.setFieldValue('loading', false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal opened={opened} size={'xl'} onClose={close} title="Update Profile">
      <div className="w-full p-4">
        <Stack spacing="sm">
          <FileInput
            label="Background Image"
            radius={'md'}
            placeholder="Upload Background Image"
            icon={<IconUpload size={20} />}
            value={backgroundImage}
            onChange={setBackgroundImage}
          />

          <FileInput
            label="Profile Image"
            radius={'md'}
            placeholder="Upload Profile Image"
            icon={<IconUpload size={20} />}
            value={profileImage}
            onChange={setProfileImage}
          />

          <TextInput
            radius={'md'}
            className="w-full"
            placeholder="First Name"
            label="First Name"
            {...form.getInputProps('first_name')}
          />

          <TextInput
            radius={'md'}
            className="w-full"
            placeholder="Last Name"
            label="Last Name"
            {...form.getInputProps('last_name')}
          />

          <TextInput
            radius={'md'}
            className="w-full"
            placeholder="Admission Number"
            label="Admission Number"
            {...form.getInputProps('admission_number')}
          />

          <TextInput
            radius={'md'}
            className="w-full"
            placeholder="Phone Number"
            label="Phone Number"
            {...form.getInputProps('phone_number')}
          />

          <TextInput
            radius={'md'}
            className="w-full"
            placeholder="Batch"
            label="Batch"
            {...form.getInputProps('batch')}
          />

          <TextInput
            radius={'md'}
            className="w-full"
            placeholder="Branch"
            label="Branch"
            {...form.getInputProps('branch')}
          />

          <TextInput
            radius={'md'}
            className="w-full"
            placeholder="Gender"
            label="Gender"
            {...form.getInputProps('gender')}
          />

          <DatePickerInput
            radius={'md'}
            className="w-full"
            placeholder="Date of Birth"
            label="Date of Birth"
            {...form.getInputProps('date_of_birth')}
          />
        </Stack>

        <div className="mt-10 flex justify-end">
          <Button fw={500} onClick={handleUpdateUserProfile}>
            Update
          </Button>
        </div>
      </div>
    </Modal>
  )
}
