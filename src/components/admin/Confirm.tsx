import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import DeleteIcon from '@mui/icons-material/Delete'
import { red } from '@mui/material/colors'

Confirmation.propTypes = {
  openConfirmation: PropTypes.bool.isRequired,
  closeConfirmation: PropTypes.func.isRequired,
  confirmFunction: PropTypes.func
}

type ConfirmProps = {
  openConfirmation: boolean
  closeConfirmation(): void
  confirmFunction(): void
}

export default function Confirmation({
  openConfirmation,
  closeConfirmation,
  confirmFunction
}: ConfirmProps) {
  return (
    <Dialog
      open={openConfirmation}
      onClose={closeConfirmation}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'Are you sure you want to delete this item?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This will be permanently be deleted
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeConfirmation} color="primary">
          Cancel
        </Button>
        <Button
          onClick={confirmFunction}
          startIcon={<DeleteIcon />}
          autoFocus
          sx={{
            backgroundColor: red[500],
            color: 'white',
            '&:hover': {
              backgroundColor: red[700]
            }
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
