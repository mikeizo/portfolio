import Image from 'next/image'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

export default function Footer() {
  const date = new Date()

  return (
    <footer>
      <Box px={5} py={2}>
        <hr />
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Image
              src="/img/logo-w-small.png"
              alt="Mike Tropea Logo"
              width={100}
              height={45}
            />
          </Grid>
          <Grid item>
            <small>{date.getFullYear()} &#169; Mike Tropea</small>
          </Grid>
        </Grid>
      </Box>
    </footer>
  )
}
