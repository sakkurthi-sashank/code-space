import { UpdateUserProfile } from '@/components/Profile/UpdateUserProfile'
import { MainLayout } from '@/layout/MainLayout'
import { useUserProfileStore } from '@/store/userProfileStore'
import { ActionIcon, Avatar, Image, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconEdit } from '@tabler/icons-react'
import { useEffect } from 'react'

export default function Profile() {
  const [opened, { open, close }] = useDisclosure(false)
  const { userProfile, fetch } = useUserProfileStore((state) => ({
    userProfile: state.userProfile,
    fetch: state.fetch,
  }))

  useEffect(() => {
    fetch()
  }, [])

  const DisplayBox = ({
    title,
    value,
  }: {
    title: string
    value: string | number
  }) => (
    <div className="w-full">
      <span className="font-semibold text-sm">{title}</span>
      <div className="bg-gray-50 px-4 min-h-[40px] py-2 rounded-md">
        {value}
      </div>
    </div>
  )

  return (
    <MainLayout>
      <div className="flex py-4 justify-center w-full h-full">
        <div className="max-w-5xl bg-white w-full">
          <div className="h-[160px] relative bg-white rounded-t-md overflow-hidden">
            <Image
              src="https://media.licdn.com/dms/image/D4D16AQFVtRGhnm4B2Q/profile-displaybackgroundimage-shrink_350_1400/0/1687155546837?e=1694649600&v=beta&t=tFaGzN91w4VF4fpW8leF5aqOlwuh7mLiMOYOleZ-RFY"
              alt="Profile"
              fit="cover"
              height={160}
            />
          </div>
          <div>
            <Avatar
              alt="Profile"
              src="https://media.licdn.com/dms/image/D5603AQEpx_s5egJgnA/profile-displayphoto-shrink_800_800/0/1678972233878?e=1694649600&v=beta&t=dHipxmSurf-Pi-Ro6t3_tWLv2TwXyUWRtMPk--5Upm4"
              radius="xl"
              size={120}
              color="indigo"
              className="m-5 -mt-20"
            />

            <div className="flex justify-end pr-6">
              <ActionIcon
                size="lg"
                color="gray"
                variant="light"
                radius="xl"
                className="-mt-5"
                onClick={open}
              >
                <IconEdit size={'1.2rem'} stroke={1.5} />
              </ActionIcon>
              <UpdateUserProfile opened={opened} close={close} />
            </div>
          </div>
          <Stack py="xl" px={60} spacing="sm">
            <div className="flex w-full space-x-6">
              <DisplayBox title="First Name" value={userProfile?.first_name!} />
              <DisplayBox title="Last Name" value={userProfile?.last_name!} />
            </div>
            <DisplayBox title="Email Address" value={userProfile?.email!} />
            <DisplayBox
              title="Admission Number"
              value={userProfile?.admission_number!}
            />
            <div className="flex w-full space-x-6">
              <DisplayBox title="Gender" value={userProfile?.gender!} />
              <DisplayBox
                title="Phone Number"
                value={userProfile?.phone_number!}
              />
            </div>
            <div className="flex w-full space-x-6">
              <DisplayBox title="Batch" value={userProfile?.batch!} />
              <DisplayBox title="Branch" value={userProfile?.branch!} />
            </div>
          </Stack>
        </div>
      </div>
    </MainLayout>
  )
}
