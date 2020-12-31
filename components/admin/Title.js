import Link from 'next/link'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  header: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
    color: '#FFFFFF',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[200]
    }
  }
}))

export default function Title({ title, addLink }) {
  const classes = useStyles()

  return (
    <Box className={classes.header}>
      <Typography variant="h4" component="h2">
        {title}
      </Typography>
      {addLink && (
        <Link href={`/admin/${addLink}`}>
          <Button className={classes.button}>
            <AddIcon />
            Add
          </Button>
        </Link>
      )}
    </Box>
  )
}
