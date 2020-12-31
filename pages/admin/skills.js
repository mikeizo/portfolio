import { useState } from 'react'
import axios from 'axios'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import Alerts from '../../components/admin/Alerts'
import SubmitButton from '../../components/admin/SubmitButton'
import Title from '../../components/admin/Title'
import { requirePageAuth } from '../../util/token'
import { connectToDatabase } from '../../util/mongodb'

export async function getServerSideProps({ req }) {
  // Authenticate user
  const profile = requirePageAuth(req.cookies.auth)
  if (!profile) {
    return {
      redirect: { destination: process.env.adminLogin, permanent: false }
    }
  }

  const { db } = await connectToDatabase()
  const skills = await db.collection('skills').find({}).toArray()

  return {
    props: {
      skills: JSON.parse(JSON.stringify(skills))
    }
  }
}

export default function AdminSkills({ skills }) {
  const [submitting, setSubmitting] = useState(false)
  const [values, setValues] = useState(skills)
  const [alert, setAlert] = useState(false)
  const [alertData, setAlertData] = useState({})

  const onSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)

    await axios
      .post('/api/admin/skills', { values })
      .then(function (response) {
        setAlert(true)
        setAlertData({
          severity: 'success',
          message: 'Success! Your skills have been saved'
        })
        return response.data
      })
      .catch(function (error) {
        console.log(error.response)
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

  const handleSliderChange = (id, event, newValue) => {
    let newObject = skills
    newObject[id].percent = newValue
    setValues(newObject)
  }

  const closeAlert = () => {
    setAlert(false)
  }

  return (
    <>
      <Alerts isOpen={alert} data={alertData} closeAlert={closeAlert} />
      <Title title="Skills" />
      <form onSubmit={onSubmit}>
        <Grid container spacing={5}>
          {values.map((item, index) => (
            <Grid key={index} item sm={12} md={6}>
              <Box textAlign="center">
                <Typography gutterBottom>{item.name}</Typography>
                <Slider
                  onChange={(e, newValue) => {
                    handleSliderChange(index, e, newValue)
                  }}
                  defaultValue={item.percent}
                  aria-labelledby="discrete-slider-always"
                  step={5}
                  min={0}
                  max={100}
                  valueLabelDisplay="on"
                />
              </Box>
            </Grid>
          ))}
        </Grid>
        <SubmitButton submitting={submitting} />
      </form>
    </>
  )
}
