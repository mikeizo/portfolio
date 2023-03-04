import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

export default function SimpleSnackbar({ isOpen, data, closeAlert }) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={isOpen}
        autoHideDuration={5000}
        onClose={closeAlert}
      >
        <Alert
          onClose={closeAlert}
          severity={data.severity}
          sx={{ width: '100%' }}
        >
          {data.message}
        </Alert>
      </Snackbar>
    </div>
  )
}
