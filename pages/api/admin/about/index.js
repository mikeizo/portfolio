import authenticated from '../../../../util/auth'
import { connectToDatabase } from '../../../../util/mongodb'
import { date } from '../../../../util/date'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    if (req.body.data) {
      const { db } = await connectToDatabase()
      const { year_from, year_to, description } = await req.body.data

      const insertDoc = {
        year_from: year_from,
        year_to: year_to,
        description: description,
        created: date(),
        updated: date()
      }
      await db.collection('about').insertOne(insertDoc)

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
