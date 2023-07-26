import { Text, ThemeIcon, Title, rem } from '@mantine/core'
import { IconMailForward } from '@tabler/icons-react'

export default function VerifyPage() {
  return (
    <div className="h-screen flex items-center flex-col space-y-6 justify-center">
      <ThemeIcon variant="light" color="green" radius={'100%'} size={80}>
        <IconMailForward size={'2.5rem'} stroke={1.5} />
      </ThemeIcon>
      <Title
        sx={{
          textAlign: 'center',
          fontWeight: 800,
          fontSize: rem(32),
        }}
      >
        Please verify your email
      </Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        sx={(theme) => ({
          maxWidth: rem(540),
          margin: 'auto',
          marginTop: theme.spacing.xl,
          marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
        })}
      >
        We have sent you an email with a link to verify your account. Please
        click on the link to verify your account.
      </Text>
    </div>
  )
}
