import Box from '@material-ui/core/Box'

export default function PageTitle(props) {
  return (
    <Box textAlign="center" mb={5}>
      <h1>{props.children}</h1>
    </Box>
  )
}
