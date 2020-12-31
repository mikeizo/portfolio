import Title from '../../../components/admin/Title'
import FormWork from '../../../components/admin/FormWork'
import { requirePageAuth } from '../../../util/token'
import { connectToDatabase } from '../../../util/mongodb'
import { ObjectId } from 'mongodb'

export async function getServerSideProps({ query, req }) {
  // Authenticate user
  const profile = requirePageAuth(req.cookies.auth)
  if (!profile) {
    return {
      redirect: { destination: process.env.adminLogin, permanent: false }
    }
  }
  const { id } = query
  const { db } = await connectToDatabase()
  const work = await db.collection('work').findOne({ _id: ObjectId(id) })

  return {
    props: {
      work: JSON.parse(JSON.stringify(work))
    }
  }
}

export default function AdminWorkId({ work }) {
  return (
    <>
      <Title title={work.name} />
      <FormWork work={work} id={work._id} />
    </>
  )
}
