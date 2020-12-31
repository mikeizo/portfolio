import authenticated from '../../../util/auth'
const aws = require('aws-sdk')

const handler = async (req, res) => {
  if (req.method === 'POST') {
    aws.config.update({
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      region: process.env.AWS_REGION,
      ACL: 'public-read'
    })

    const path = req.body.fileData.path
      ? `portfolio/logos/${req.body.fileData.filename}`
      : `portfolio/${req.body.fileData.filename}`

    const s3 = new aws.S3()

    const post = await s3.createPresignedPost({
      Bucket: 'mtropea',
      Fields: {
        key: path
      },
      Expires: 60,
      Conditions: [['content-length-range', 0, 10000000]]
    })

    res.status(200).json(post)
  } else {
    // Method not allowed
    res.status(405).end()
  }
}

export default authenticated(handler)
