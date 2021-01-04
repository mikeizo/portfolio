import authenticated from '../../../../util/auth'
import { connectToDatabase } from '../../../../util/mongodb'
import { date } from '../../../../util/date'

const handler = async (req, res) => {
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

      const insertDoc = {
        name: name,
        slug: slug,
        resources: resources,
        weight: parseInt(weight),
        url: url,
        git: git,
        description: description,
        logo: logo,
        images: images,
        created: date(),
        updated: date()
      }

      await db.collection('work').insertOne(insertDoc)

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
