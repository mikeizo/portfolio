import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

// const useStyles = makeStyles((theme) => ({
//   buttons: {
//     marginTop: theme.spacing(4),
//     display: 'flex',
//     justifyContent: 'flex-end'
//   }
// }))

export default function SubmitButton({ submitting }) {
  return (
    <Box
      sx={{
        marginTop: 2,
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={submitting}
      >
        {submitting && <CircularProgress size={20} />}
        Save
      </Button>
    </Box>
  )
}
