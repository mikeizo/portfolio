import authenticated from '../../../../util/auth'
import { connectToDatabase } from '../../../../util/mongodb'
import { date } from '../../../../util/date'
import { ObjectId } from 'mongodb'

const handler = async (req, res) => {
  const {
    query: { id }
  } = req

  if (req.method === 'POST') {
    if (req.body.data) {
      const { db } = await connectToDatabase()
      const { year_from, year_to, description } = await req.body.data

      const updateDoc = {
        $set: {
          year_from: year_from,
          year_to: year_to,
          description: description,
          updated: date()
        }
      }
      await db.collection('about').updateOne({ _id: ObjectId(id) }, updateDoc)

      res.status(200).send('Success')
    } else {
      res.status(400).end()
    }
  } else if (req.method === 'DELETE') {
    const { db } = await connectToDatabase()
    await db.collection('about').deleteOne({ _id: ObjectId(id) })
    res.status(200).send('Success')
  } else {
    // Method not allowed
    res.status(405).end()
  }
}

export default authenticated(handler)
