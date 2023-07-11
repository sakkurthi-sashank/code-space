import { MainLayout } from '@/layout/MainLayout'
import { useUserProfileStore } from '@/store/userProfileStore'
import { ActionIcon, Avatar, Image, Stack } from '@mantine/core'
import { IconEdit } from '@tabler/icons-react'
import { useEffect } from 'react'

export default function Profile() {
  const { userProfile, fetch } = useUserProfileStore((state) => ({
    userProfile: state.userProfile,
    fetch: state.fetch,
  }))

  useEffect(() => {
    fetch()
  }, [])

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
            <ActionIcon
              size="sm"
              color="gray"
              variant="light"
              radius="xl"
              className="absolute top-0 right-0 m-5"
            >
              <IconEdit size={'0.8rem'} stroke={1.5} />
            </ActionIcon>
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
              >
                <IconEdit size={'1.2rem'} stroke={1.5} />
              </ActionIcon>
            </div>
          </div>

          <Stack py="xl" px={60} spacing="sm">
            <div className="flex w-full space-x-6">
              <div className="w-full">
                <span className="font-semibold  text-sm">First Name</span>
                <div className="bg-gray-100 px-4 py-2 rounded-md">
                  {userProfile?.first_name}
                </div>
              </div>

              <div className="w-full">
                <span className="font-semibold  text-sm">Last Name</span>
                <div className="bg-gray-100 px-4 py-2 rounded-md">
                  {userProfile?.last_name}
                </div>
              </div>
            </div>

            <div className="w-full">
              <span className="font-semibold  text-sm">Email Address</span>
              <div className="bg-gray-100 px-4 py-2 rounded-md">
                {userProfile?.email}
              </div>
            </div>

            <div className="w-full">
              <span className="font-semibold  text-sm">Admission Number</span>
              <div className="bg-gray-100 px-4 py-2 rounded-md">
                {userProfile?.admission_number}
              </div>
            </div>

            <div className="flex w-full space-x-6">
              <div className="w-full">
                <span className="font-semibold  text-sm">Gender</span>
                <div className="bg-gray-100 px-4 py-2 rounded-md">
                  {userProfile?.gender}
                </div>
              </div>

              <div className="w-full">
                <span className="font-semibold  text-sm">Phone Number</span>
                <div className="bg-gray-100 px-4 py-2 rounded-md">
                  {userProfile?.phone_number}
                </div>
              </div>
            </div>

            <div className="flex w-full space-x-6">
              <div className="w-full">
                <span className="font-semibold  text-sm">Batch</span>
                <div className="bg-gray-100 px-4 py-2 rounded-md">
                  {userProfile?.batch}
                </div>
              </div>

              <div className="w-full">
                <span className="font-semibold  text-sm">Branch</span>
                <div className="bg-gray-100 px-4 py-2 rounded-md">
                  {userProfile?.branch}
                </div>
              </div>
            </div>
          </Stack>
        </div>
      </div>
    </MainLayout>
  )
}
