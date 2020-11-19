import Image from 'next/image'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

export default function Footer() {
  const date = new Date()

  return (
    <footer>
      <hr />
      <Box px={5} py={2}>
        <Grid container direction="column" justify="center" alignItems="center">
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
