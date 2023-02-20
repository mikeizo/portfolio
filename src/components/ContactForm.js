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
    await fetch('/api/mail', {
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
              <InputLabel htmlFor="phone">*Name</InputLabel>
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
                    {...field}
                    fullWidth
                    placeholder="Ben Kenobi"
                    color="primary"
                    error={errors.name ? true : false}
                    helperText={errors.name ? errors.name.message : ' '}
                  />
                )}
              />
              <InputLabel htmlFor="phone">*Email</InputLabel>
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
                    {...field}
                    fullWidth
                    placeholder="ben.kenobi@jedimaste.com"
                    color="primary"
                    helperText={errors.email ? errors.email.message : ' '}
                    error={errors.email ? true : false}
                  />
                )}
              />
              <InputLabel htmlFor="phone">Phone</InputLabel>
              <Controller
                name="phone"
                control={control}
                rules={{
                  pattern: {
                    value:
                      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i
                  },
                  minLength: {
                    value: 10
                  },
                  maxLength: {
                    value: 14
                  }
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="914-555-1234"
                    color="primary"
                    helperText={errors.phone ? 'Phone number is invalid' : ''}
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
