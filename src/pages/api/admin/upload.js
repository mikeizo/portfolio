import authenticated from '@/util/auth'
import upload from '@/util/upload'
import nc from 'next-connect'

/**
 * UPLOAD FILES
 */
const handler = nc()
  .use(upload.array('photos'))
  .post(async (req, res) => {
    res.status(200).json(req.files)
  })

export const config = {
  api: {
    bodyParser: false
  }
}

export default authenticated(handler)
