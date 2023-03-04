import authenticated from '@/util/auth'
import { connectToDatabase } from '@/util/mongodb'
import { ObjectId } from 'mongodb'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    if (req.body.values) {
      const { db } = await connectToDatabase()
      const skills = await req.body.values

      skills.forEach(async function (skill) {
        let updateDoc = {
          $set: {
            percent: skill.percent
          }
        }

        await db
          .collection('skills')
          .updateOne({ _id: new ObjectId(skill._id) }, updateDoc)
      })
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
