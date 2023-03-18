import Snackbar from '@mui/material/Snackbar'
import Alert, { AlertColor } from '@mui/material/Alert'

type AlertProps = {
  isOpen: boolean
  data: {
    severity: AlertColor
    message: string
  }
  closeAlert(): void
}

export default function SimpleSnackbar({
  isOpen,
  data,
  closeAlert
}: AlertProps) {
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
