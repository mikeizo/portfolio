import { S3, config } from 'aws-sdk'
const multer = require('multer')
const multerS3 = require('multer-s3')

/**
 * UPLOAD FILES
 */
config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION_APP
})

const s3 = new S3()

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname })
    },
    key: (req, file, cb) => {
      cb(null, `portfolio/${req.body.path}${file.originalname}`)
    }
  })
})

export default upload
