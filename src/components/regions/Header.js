import Link from 'next/link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Logo from '@/components/img/Logo'
import Menu from '@/components/regions/Menu'

export default function Header() {
  return (
    <header>
      <Box component="nav" sx={{ padding: 5 }}>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <Link href="/">
              <Logo />
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
