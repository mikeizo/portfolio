import Router from 'next/router'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  logo: {
    width: '100%'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  linkDecoration: {
    textDecoration: 'none'
  },
  message: {
    color: 'red'
  }
}))

export default function SignIn() {
  const classes = useStyles()
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    pass: ''
  })

  const handleChange = (data) => {
    setFormData({
      ...formData,
      [data.target.name]: data.target.value
    })
  }

  const handleSubmit = async (data) => {
    data.preventDefault()
    setSubmitting(true)
    await axios
      .post('/api/admin/login', { formData })
      .then(function (response) {
        Router.push('/admin/work')
        return response.data
      })
      .catch(function (error) {
        setMessage(true)
        return error
      })
      .finally(function () {
        setSubmitting(false)
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box mt={8} textAlign="center">
        <img className={classes.logo} src="/img/mtropea-logo.png" />
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            label="Email"
            name="email"
            id="email"
            autoComplete="email"
            required
            fullWidth
            autoFocus
          />
          <TextField
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            name="pass"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            required
            fullWidth
          />
          {message && (
            <span className={classes.message}>Invalid email or password</span>
          )}
          <Box mt={2}>
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              disabled={submitting}
              fullWidth
            >
              {submitting && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
              Sign In
            </Button>
          </Box>
        </form>
        <Box mt={5}>
          <Link href="/">
            <a className={classes.linkDecoration}>&larr; Back to site</a>
          </Link>
        </Box>
      </Box>
    </Container>
  )
}
