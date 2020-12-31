import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DeleteIcon from '@material-ui/icons/Delete'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

Confirmation.propTypes = {
  openConfirmation: PropTypes.bool.isRequired,
  closeConfirmation: PropTypes.func.isRequired,
  confirmFunction: PropTypes.func
}

const useStyles = makeStyles(() => ({
  delete: {
    backgroundColor: red[500],
    color: 'white',
    '&:hover': {
      backgroundColor: red[700]
    }
  }
}))

export default function Confirmation({
  openConfirmation,
  closeConfirmation,
  confirmFunction
}) {
  const classes = useStyles()

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
          className={classes.delete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
