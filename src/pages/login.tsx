import { useState, SyntheticEvent } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import CssBaseline from '@mui/material/CssBaseline'

export default function SignIn() {
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    pass: ''
  })

  const handleChange = (data: { target: { name: string; value: string } }) => {
    setFormData({
      ...formData,
      [data.target.name]: data.target.value
    })
  }

  const handleSubmit = async (data: SyntheticEvent) => {
    data.preventDefault()
    setSubmitting(true)
    await axios
      .post('/api/admin/login', { formData })
      .then(function (response) {
        Router.push('/admin')
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
    <Container
      maxWidth="xs"
      sx={{
        p: 5,
        mt: 8,
        backgroundColor: '#FFF',
        borderRadius: 3
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <img
          className="classes.logo"
          src="/img/mtropea-logo.png"
          width="100%"
        />
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
                  className="classes.buttonProgress"
                />
              )}
              Sign In
            </Button>
          </Box>
        </form>
        {message && (
          <Box my={2}>
            <Alert severity="error">Invalid email or password</Alert>
          </Box>
        )}
        <Box mt={5}>
          <Link href="/" className="classes.linkDecoration">
            &larr; Back to site
          </Link>
        </Box>
      </Box>
    </Container>
  )
}
