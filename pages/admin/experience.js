import { useState } from 'react'
import axios from 'axios'
import Box from '@material-ui/core/Box'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Alerts from '../../components/admin/Alerts'
import SubmitButton from '../../components/admin/SubmitButton'
import Title from '../../components/admin/Title'
import { requirePageAuth } from '../../util/token'
import { connectToDatabase } from '../../util/mongodb'
import 'devicon'

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'flex-end'
  },
  icon: {
    fontSize: '3rem'
  },
  deleteIcon: {
    color: 'red'
  },
  listIcons: {
    fontSize: '1rem'
  }
}))

export async function getServerSideProps({ req }) {
  // Authenticate user
  const profile = requirePageAuth(req.cookies.auth)
  if (!profile) {
    return {
      redirect: { destination: process.env.adminLogin, permanent: false }
    }
  }

  const { db } = await connectToDatabase()
  const experience = await db.collection('experience').find({}).toArray()

  return {
    props: {
      experience: JSON.parse(JSON.stringify(experience))
    }
  }
}

export default function AdminExperience({ experience }) {
  const classes = useStyles()
  const [submitting, setSubmitting] = useState(false)
  const [experiences, setExperiences] = useState(experience)
  const [remove, setRemove] = useState([])
  const [add, setAdd] = useState([])
  const [input, setInput] = useState({})
  const [error, setError] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertData, setAlertData] = useState({})

  const onSubmit = async (event) => {
    event.preventDefault()

    if (add.length) {
      setExperiences(experiences.concat(add))
      setAdd([])
    }

    if (add.length || remove.length) {
      await axios
        .post('/api/admin/experience/', { remove, add })
        .then(function (response) {
          setAlert(true)
          setAlertData({
            severity: 'success',
            message: 'Success! Your experiences have been saved'
          })
          return response.data
        })
        .catch(function (error) {
          setAlert(true)
          setAlertData({
            severity: 'error',
            message: `${error.response.status} - ${error.response.statusText}`
          })
        })
        .finally(function () {
          setSubmitting(false)
        })
    }
  }

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    setInput({
      ...input,
      [name]: value
    })
  }

  const addExperience = () => {
    if (input.name && input.icon) {
      setAdd(add.concat(input))
      document.getElementById('experience-form').reset()
      setInput({})
      setError(false)
    } else {
      setError(true)
    }
  }

  const removeAddition = (id) => {
    let newExperiences = [...add]
    newExperiences.splice(id, 1)
    setAdd(newExperiences)
  }

  const deleteExperience = (id) => {
    let newExperiences = [...experiences]
    let newRemove = remove

    newExperiences.splice(id, 1)
    newRemove.push(experiences[id])

    setExperiences(newExperiences)
    setRemove(newRemove)
  }

  const closeAlert = () => {
    setAlert(false)
  }

  return (
    <>
      <Alerts isOpen={alert} data={alertData} closeAlert={closeAlert} />
      <Title title="Experience" />
      <form onSubmit={onSubmit} id="experience-form">
        <Grid container spacing={2}>
          {experiences.map((item, index) => (
            <Grid key={index} item xs={6} sm={3} md={2}>
              <Box textAlign="center" className={classes.icon}>
                <i className={item.icon}></i>
              </Box>
              <Box textAlign="center">
                <span>{item.name}</span>
              </Box>
              <Box textAlign="center">
                <IconButton
                  alt="Delete"
                  className={classes.deleteIcon}
                  onClick={() => deleteExperience(index)}
                >
                  <HighlightOffIcon />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h4>Add Experience</h4>
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              error={error ? true : false}
              helperText={error ? 'Name is required' : ' '}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              name="icon"
              label="Icon Class"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              error={error ? true : false}
              helperText={error ? 'Icon is required' : ' '}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <Fab color="primary" aria-label="add" onClick={addExperience}>
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <List>
            {add.map((item, index) => (
              <ListItem key={index}>
                <IconButton
                  alt="Remove"
                  className={classes.deleteIcon}
                  onClick={() => removeAddition(index)}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
                {item.name} -
                <Typography variant="h4">
                  <i className={item.icon}></i>
                </Typography>
              </ListItem>
            ))}
          </List>
        </Grid>
        <SubmitButton submitting={submitting} />
      </form>
    </>
  )
}
