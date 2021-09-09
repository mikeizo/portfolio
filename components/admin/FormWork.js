import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/router'
import axios from 'axios'
import ChipInput from 'material-ui-chip-input'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CircularProgress from '@material-ui/core/CircularProgress'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Alerts from './Alerts'
import SubmitButton from './SubmitButton'

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'flex-end'
  },
  logoContainer: {
    textAlign: 'center'
  },
  logo: {
    maxHeight: 150
  },
  card: {
    position: 'relative'
  },
  media: {
    height: 200
  },
  input: {
    display: 'none'
  },
  photoIcon: {
    marginRight: '10px'
  },
  deleteIcon: {
    position: 'absolute',
    color: 'red',
    top: 0,
    right: 0
  }
}))

export default function FormWork({ work, id }) {
  const classes = useStyles()
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [resources, setResources] = useState(work.resources)
  const [logo, setLogo] = useState(work.logo)
  const [images, setImages] = useState(work.images ? work.images : [])
  const [alert, setAlert] = useState(false)
  const [alertData, setAlertData] = useState({})
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm()

  const handleResources = (data) => {
    setResources(data)
  }

  const closeAlert = () => {
    setAlert(false)
  }

  const onSubmit = async (data) => {
    await axios
      .post(`/api/admin/work/${id}`, { ...data, resources, logo, images })
      .then(function (response) {
        if (!id) {
          router.push('/admin/work')
        }
        setAlert(true)
        setAlertData({
          severity: 'success',
          message: 'Success! Your work has been saved'
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

  const uploadFile = async (path, data) => {
    setUploading(true)
    const photos = data.target.files
    const formData = new FormData()

    formData.append(`path`, path)

    for (let i = 0; i < photos.length; i++) {
      formData.append(`photos`, photos[i])
    }

    await axios
      .post('/api/admin/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(function (response) {
        response.data.forEach((element) => {
          if (path == 'logos/') {
            setLogo(element.originalname)
          } else {
            setImages((images) => [...images, element.originalname])
          }
        })

        return response.data
      })
      .catch(function (error) {
        setAlert(true)
        setAlertData({
          severity: 'error',
          message: `Error: ${error}`
        })
      })
      .finally(function () {
        setUploading(false)
      })
  }

  const deleteFile = (id) => {
    const newList = [...images]
    newList.splice(id, 1)
    setImages(newList)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Alerts isOpen={alert} data={alertData} closeAlert={closeAlert} />
      <Grid container spacing={4}>
        <Grid item spacing={2} container xs={12} md={8}>
          <Grid item xs={12} md={6}>
            <Controller
              name="name"
              defaultValue={work.name}
              rules={{
                required: 'Name is required',
                minLength: {
                  value: 3,
                  message: 'Name must be longer than 2 characters'
                },
                maxLength: {
                  value: 30,
                  message: 'Name must be less than 30 characters'
                }
              }}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  error={errors.name ? true : false}
                  helperText={errors.name ? errors.name.message : ' '}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="slug"
              defaultValue={work.slug}
              rules={{
                required: 'Slug is required',
                minLength: {
                  value: 3,
                  message: 'Name must be longer than 2 characters'
                },
                maxLength: {
                  value: 30,
                  message: 'Name must be less than 30 characters'
                }
              }}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Slug"
                  variant="outlined"
                  fullWidth
                  error={errors.slug ? true : false}
                  helperText={errors.slug ? errors.slug.message : ' '}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={10}>
            <ChipInput
              defaultValue={work.resources}
              onChange={handleResources}
              name="resources"
              label="Resources"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <Controller
              name="weight"
              defaultValue={work.weight}
              rules={{
                required: 'Weight is required',
                pattern: {
                  value: /[0-9]/,
                  message: 'Weight must be a number'
                }
              }}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Weight"
                  variant="outlined"
                  type="number"
                  fullWidth
                  error={errors.weight ? true : false}
                  helperText={errors.weight ? errors.weight.message : ' '}
                  {...field}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} className={classes.logoContainer}>
          <h4>Logo:</h4>
          {logo && (
            <img
              className={classes.logo}
              src={`${process.env.awsS3Logo}${logo}`}
              alt={work.name}
            />
          )}
          <div>
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              type="file"
              onChange={(e) => uploadFile('logos/', e)}
            />
            <label htmlFor="icon-button-file">
              <Button variant="contained" color="primary" component="span">
                <PhotoCamera className={classes.photoIcon} /> Upload
              </Button>
            </label>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="url"
            defaultValue={work.url || ''}
            control={control}
            render={({ field }) => (
              <TextField label="Url" variant="outlined" fullWidth {...field} />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="git"
            defaultValue={work.git || ''}
            control={control}
            render={({ field }) => (
              <TextField label="Git" variant="outlined" fullWidth {...field} />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="description"
            defaultValue={work.description || ''}
            control={control}
            render={({ field }) => (
              <TextField
                label="Description"
                variant="outlined"
                rows={3}
                fullWidth
                multiline
                {...field}
              />
            )}
          />
        </Grid>
        {images &&
          images.map((image, index) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={image}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={`${process.env.awsS3}${image}`}
                  />
                  <IconButton
                    className={classes.deleteIcon}
                    onClick={() => deleteFile(index)}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                </Card>
              </Grid>
            )
          })}
        <Grid item xs={12}>
          <h4>Upload Images</h4>
          <input
            id="images-files"
            className={classes.input}
            type="file"
            multiple
            onChange={(e) => uploadFile('', e)}
          />
          <label htmlFor="images-files">
            <Button variant="contained" color="primary" component="span">
              {uploading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                <PhotoCamera className={classes.photoIcon} />
              )}
              Upload
            </Button>
          </label>
        </Grid>
      </Grid>
      <SubmitButton submitting={submitting} />
    </form>
  )
}
