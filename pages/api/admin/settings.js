import { connectToDatabase } from '../../../util/mongodb'
import authenticated from '../../../util/auth'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    if (req.body.data) {
      const { db } = await connectToDatabase()
      const { about, email } = await req.body.data

      const updateDoc = {
        $set: {
          about: about,
          email: email
        }
      }
      await db.collection('settings').updateOne({}, updateDoc)

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
