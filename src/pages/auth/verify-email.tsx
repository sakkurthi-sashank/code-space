import { Text, ThemeIcon, Title, rem, useMantineTheme } from '@mantine/core'
import { IconMailForward } from '@tabler/icons-react'

export default function VerifyEmailPage() {
  const theme = useMantineTheme()

  return (
    <div className="h-screen flex items-center flex-col space-y-6 justify-center">
      <ThemeIcon variant="light" color="green" radius={'100%'} size={80}>
        <IconMailForward size={'2.5rem'} stroke={1.5} />
      </ThemeIcon>
      <Title
        sx={{
          textAlign: 'center',
          fontWeight: 700,
          fontSize: rem(32),
        }}
        color={theme.colors.gray[8]}
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
