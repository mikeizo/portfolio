import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'flex-end'
  }
}))

export default function SubmitButton({ submitting }) {
  const classes = useStyles()

  return (
    <div className={classes.buttons}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={submitting}
      >
        {submitting && <CircularProgress size={20} />}
        Save
      </Button>
    </div>
  )
}
