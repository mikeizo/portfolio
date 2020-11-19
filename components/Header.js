import Link from 'next/link'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Logo from '../components/Logo'
import Menu from './Menu'

export default function Header() {
  return (
    <header>
      <Box component="nav" p={5}>
        <Grid
          container
          direction="row"
          justify="space-between"
        >
          <Grid item>
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>
          </Grid>
          <Grid item>
            <Menu />
          </Grid>
        </Grid>
      </Box>
    </header>
  )
}
