import { connectToDatabase } from '../../../util/mongodb'
import authenticated from '../../../util/auth'
import { ObjectId } from 'mongodb'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    if (req.body) {
      const { db } = await connectToDatabase()
      const { remove, add } = req.body
      const options = { ordered: true }

      if (add.length) {
        await db.collection('experience').insertMany(add, options)
      }

      if (remove.length) {
        const objects = []
        remove.forEach(async (item) => {
          objects.push(ObjectId(item._id))
        })
        await db.collection('experience').deleteMany({ _id: { $in: objects } })
      }

      res.status(200).send('Success')
    } else {
      res.status(400).end()
    }
  } else {
    // Method not allowed
    res.status(405).end()
  }
}

export default authenticated(handler)
