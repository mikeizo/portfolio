import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

export default function Alerts({ isOpen, data, closeAlert }) {
  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={closeAlert}>
      <MuiAlert severity={data.severity}>{data.message}</MuiAlert>
    </Snackbar>
  )
}
