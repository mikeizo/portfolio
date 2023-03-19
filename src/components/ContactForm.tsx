import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import CircularProgress from '@mui/material/CircularProgress'
import { createTheme, ThemeProvider } from '@mui/material/styles'

type FormValues = {
  name: string
  email: string
  phone: string
  comments: string
}

type contactFormProps = {
  contactChange(): void
  contact: boolean
}

const theme = createTheme({
  palette: {
    primary: { main: '#2A558C' }
  }
})

export default function ContactForm({
  contactChange,
  contact
}: contactFormProps) {
  const [submitting, setSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormValues>()

  const onSubmit = async (data: any) => {
    setSubmitting(true)

    await axios
      .post('/api/mail', { data })
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
              <Box mt={0}>
                <Controller
                  name="name"
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
                      {...field}
                      fullWidth
                      label="*Name"
                      variant="standard"
                      color="primary"
                      error={errors.name ? true : false}
                      helperText={errors?.name?.message}
                    />
                  )}
                />
              </Box>
              <Box mt={3}>
                <Controller
                  name="email"
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
                      {...field}
                      fullWidth
                      label="*Email"
                      variant="standard"
                      color="primary"
                      error={errors.email ? true : false}
                      helperText={errors?.email?.message}
                    />
                  )}
                />
              </Box>
              <Box mt={3}>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    pattern: {
                      value:
                        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i,
                      message: 'Invalid phone number'
                    },
                    minLength: {
                      value: 10,
                      message: 'Invalid phone number'
                    },
                    maxLength: {
                      value: 14,
                      message: 'Invalid phone number'
                    }
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Phone"
                      variant="standard"
                      color="primary"
                      error={fieldState.invalid}
                      helperText={errors.phone ? 'Phone number is invalid' : ''}
                    />
                  )}
                />
              </Box>
              <Box mt={4}>
                <Controller
                  name="comments"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Comments"
                      color="primary"
                      variant="filled"
                      maxRows={4}
                      multiline
                      fullWidth
                      {...field}
                    />
                  )}
                />
              </Box>
            </Box>
          </ThemeProvider>
          <DialogActions>
            <Box sx={{ marginRight: 3 }}>
              {formMessage && <span className="message">{formMessage}</span>}
            </Box>
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
