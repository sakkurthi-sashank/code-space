import { ThemeIcon } from '@mantine/core'
import { IconMail } from '@tabler/icons-react'

const VerifyEmail = () => {
  return (
    <div className="h-screen flex-col flex items-center justify-center">
      <div className="flex items-center justify-center flex-col max-w-xl">
        <ThemeIcon variant="light" color="green" size={60} radius={'100%'}>
          <IconMail size={'2rem'} stroke={1.5} />
        </ThemeIcon>
        <div className="text-lg font-medium text-gray-700 mt-10 text-center">
          We have sent you an email. Please verify your email address to
          continue.
        </div>
        <div className="text-center mt-10 text-sm text-gray-600">
          If you haven&apos;t verify your are not able to login to your account.
          check your spam folder if you didn&apos;t receive any email.
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail
