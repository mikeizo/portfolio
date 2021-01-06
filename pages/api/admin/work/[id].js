import authenticated from '../../../../util/auth'
import { connectToDatabase } from '../../../../util/mongodb'
import { date } from '../../../../util/date'
import { ObjectId } from 'mongodb'

const handler = async (req, res) => {
  const {
    query: { id }
  } = req

  if (req.method === 'POST') {
    if (req.body) {
      const { db } = await connectToDatabase()
      const {
        name,
        slug,
        resources,
        weight,
        url,
        git,
        description,
        logo,
        images
      } = await req.body

      if (!name || !slug) {
        res.status(400).end()
      }

      const updateDoc = {
        $set: {
          name: name,
          slug: slug,
          resources: resources,
          weight: parseInt(weight),
          url: url,
          git: git,
          description: description,
          logo: logo,
          images: images,
          updated: date()
        }
      }

      await db.collection('work').updateOne({ _id: ObjectId(id) }, updateDoc)

      res.status(200).send('Success')
    } else {
      res.status(400).end()
    }
  } else if (req.method === 'DELETE') {
    const { db } = await connectToDatabase()
    await db.collection('work').deleteOne({ _id: ObjectId(id) })
    res.status(200).send('Success')
  } else {
    // Method not allowed
    res.status(405).end()
  }
}

export default authenticated(handler)
