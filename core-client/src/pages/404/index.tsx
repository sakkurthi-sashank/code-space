import { Container, createStyles, rem } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.colors.gray[4],

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(120),
    },
  },
}))

export default function Custom404() {
  const { classes } = useStyles()

  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
    </Container>
  )
}
