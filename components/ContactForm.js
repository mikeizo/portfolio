import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import MaskedInput from 'react-text-mask'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import CircularProgress from '@material-ui/core/CircularProgress'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2A558C' }
  }
})

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired
}

function TextMaskCustom(props) {
  const { inputRef, ...other } = props

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null)
      }}
      // eslint-disable-next-line prettier/prettier
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  )
}

export default function ContactForm({ contactChange, contact }) {
  const [submitting, setSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const { register, handleSubmit, errors, reset } = useForm()

  const [values, setValues] = useState({
    textmask: '(  )    -    '
  })

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = async (data) => {
    setSubmitting(true)
    await axios
      .post('/api/mail', { data })
      .then(function (response) {
        reset()
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
      className="contact-form"
      open={contact}
      onClose={contactChange}
      maxWidth="sm"
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
              <TextField
                inputRef={register({
                  required: 'Name is required',
                  minLength: {
                    value: 3,
                    message: 'Name must be longer than 2 characters'
                  },
                  maxLength: {
                    value: 30,
                    message: 'Name must be less than 30 characters'
                  }
                })}
                name="name"
                label="Name"
                fullWidth
                error={errors.name ? true : false}
                helperText={errors.name ? errors.name.message : ' '}
                color="primary"
              />
              <TextField
                inputRef={register({
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                error={errors.email ? true : false}
                helperText={errors.email ? errors.email.message : ' '}
              />
              <InputLabel htmlFor="phone">Phone</InputLabel>
              <Input
                inputRef={register}
                value={values.phone}
                onChange={handleChange}
                fullWidth
                name="phone"
                id="phone"
                inputComponent={TextMaskCustom}
              />
              <Box mt={2}></Box>
              <TextField
                inputRef={register}
                name="comments"
                label="Comments"
                variant="outlined"
                color="primary"
                rowsMax={4}
                multiline
                fullWidth
              />
            </Box>
          </ThemeProvider>
          <DialogActions>
            {formMessage && <span className="message">{formMessage}</span>}
            {submitting && <CircularProgress color="primary" size={20} />}
            <button
              type="submit"
              className="btn btn-black"
              disabled={submitting}
            >
              Submit
            </button>
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
