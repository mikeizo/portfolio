import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
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
  const settings = await db.collection('settings').findOne({})

  return {
    props: {
      settings: JSON.parse(JSON.stringify(settings))
    }
  }
}

export default function AdminSettings({ settings }) {
  const [submitting, setSubmitting] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertData, setAlertData] = useState({})
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async (data) => {
    setSubmitting(true)
    await axios
      .post('/api/admin/settings', { data })
      .then(function (response) {
        setAlert(true)
        setAlertData({
          severity: 'success',
          message: 'Success! Your settings have been saved'
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

  const closeAlert = () => {
    setAlert(false)
  }

  return (
    <>
      <Alerts isOpen={alert} data={alertData} closeAlert={closeAlert} />
      <Title title="Settings" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              inputRef={register}
              name="email"
              label="Email Address"
              type="email"
              variant="outlined"
              defaultValue={settings.email}
              fullWidth
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email.message : ' '}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              inputRef={register}
              name="about"
              label="About Statement"
              variant="outlined"
              defaultValue={settings.about}
              rows={4}
              multiline
              fullWidth
            />
          </Grid>
        </Grid>
        <SubmitButton submitting={submitting} />
      </form>
    </>
  )
}
