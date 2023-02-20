import Box from '@mui/material/Box'
type Props = {
  children?: React.ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <Box textAlign="center" mb={5}>
      <h1>{children}</h1>
    </Box>
  )
}
