import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Alerts from './Alerts'
import SubmitButton from './SubmitButton'

export default function FormAbout({ about, id }) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertData, setAlertData] = useState({})
  const { register, handleSubmit, errors } = useForm()

  const closeAlert = () => {
    setAlert(false)
  }

  const onSubmit = async (data) => {
    await axios
      .post(`/api/admin/about/${id}`, { data })
      .then(function (response) {
        if (!id) {
          router.push('/admin/about')
        }
        setAlert(true)
        setAlertData({
          severity: 'success',
          message: 'Success! Your timeline has been saved'
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Alerts isOpen={alert} data={alertData} closeAlert={closeAlert} />
      <Grid container spacing={4}>
        <Grid item sm={6}>
          <TextField
            inputRef={register({
              required: 'Year From is required',
              pattern: {
                value: /^\d{4}$/,
                message: 'Year must be in format YYYY'
              }
            })}
            name="year_from"
            label="Year From"
            variant="outlined"
            defaultValue={about.year_from}
            fullWidth
            error={errors.year_from ? true : false}
            helperText={errors.year_from ? errors.year_from.message : ' '}
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            inputRef={register({
              pattern: {
                value: /^\d{4}$/,
                message: 'Year must be in format YYYY'
              }
            })}
            name="year_to"
            label="Year To"
            variant="outlined"
            defaultValue={about.year_to}
            fullWidth
            error={errors.year_to ? true : false}
            helperText={errors.year_to ? errors.year_to.message : ' '}
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            inputRef={register({
              required: 'Description is required',
              minLength: {
                value: 10,
                message: 'Name must be longer than 10 characters'
              },
              maxLength: {
                value: 400,
                message: 'Name must be less than 400 characters'
              }
            })}
            name="description"
            label="Description"
            variant="outlined"
            defaultValue={about.description}
            rows={3}
            multiline
            fullWidth
            error={errors.description ? true : false}
            helperText={errors.description ? errors.description.message : ' '}
          />
        </Grid>
      </Grid>
      <SubmitButton submitting={submitting} />
    </form>
  )
}
