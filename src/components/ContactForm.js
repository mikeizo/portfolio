import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import CircularProgress from '@mui/material/CircularProgress'
import InputLabel from '@mui/material/InputLabel'
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: { main: '#2A558C' }
  }
})

export default function ContactForm({ contactChange, contact }) {
  const [submitting, setSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    setSubmitting(true)
    const res = await fetch('/api/mail', {
      body: JSON.stringify({ data }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
      .then(function (response) {
        reset({
          name: '',
          email: '',
          phone: '',
          comments: ''
        })
        setFormMessage('Your Form has been submitted')
        return response.data
      })
      .catch(function () {
        setFormMessage('Sorry, an error occurred')
      })
      .finally(function () {
        setSubmitting(false)
      })
  }

  return (
    <Dialog
      id="app"
      fullWidth={true}
      maxWidth="xs"
      open={contact}
      onClose={contactChange}
    >
      <Box position="absolute" right={2} top={2}>
        <IconButton aria-label="close" onClick={contactChange}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box textAlign="center" mt={3}>
        <h2>Contact Me</h2>
        <Box mt={2}>
          <h5>Please fill out the form below</h5>
        </Box>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <ThemeProvider theme={theme}>
            <Box>
              <Controller
                name="name"
                defaultValue=""
                control={control}
                rules={{
                  required: 'Name is Required',
                  minLength: {
                    value: 3,
                    message: 'Name must be longer than 2 characters'
                  },
                  maxLength: {
                    value: 30,
                    message: 'Name must be less than 30 characters'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    label="*Name"
                    color="primary"
                    error={errors.name ? true : false}
                    helperText={errors.name ? errors.name.message : ' '}
                    fullWidth
                    {...field}
                  />
                )}
              />
              <Controller
                name="email"
                defaultValue=""
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    label="*Email"
                    color="primary"
                    error={errors.email ? true : false}
                    helperText={errors.email ? errors.email.message : ' '}
                    fullWidth
                    {...field}
                  />
                )}
              />
              <InputLabel htmlFor="phone">Phone</InputLabel>
              <Controller
                name="phone"
                control={control}
                rules={{ validate: matchIsValidTel }}
                render={({ field, fieldState }) => (
                  <MuiTelInput
                    {...field}
                    fullWidth
                    color="primary"
                    disableDropdown
                    defaultCountry={'US'}
                    onlyCountries={['US']}
                    helperText={fieldState.invalid ? 'Phone is invalid' : ''}
                    error={fieldState.invalid}
                  />
                )}
              />
              <Box mt={4}></Box>
              <Controller
                name="comments"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Comments"
                    color="primary"
                    variant="outlined"
                    maxRows={4}
                    multiline
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Box>
          </ThemeProvider>
          <DialogActions>
            {formMessage && <span className="message">{formMessage}</span>}
            <Button
              type="submit"
              className="btn btn-black"
              disabled={submitting}
            >
              {submitting && <CircularProgress size={20} />}
              Submit
            </Button>
          </DialogActions>
        </DialogContent>
      </form>
      <style jsx>{`
        .message {
          color: green;
          font-size: 15px;
        }
        #rc-imageselect {
          transform: scale(0.77);
          -webkit-transform: scale(0.77);
          transform-origin: 0 0;
          -webkit-transform-origin: 0 0;
        }
      `}</style>
    </Dialog>
  )
}