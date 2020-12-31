import Title from '../../../components/admin/Title'
import FormAbout from '../../../components/admin/FormAbout'
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
  const about = await db.collection('about').findOne({ _id: ObjectId(id) })

  return {
    props: {
      about: JSON.parse(JSON.stringify(about))
    }
  }
}

export default function AdminAboutId({ about }) {
  const title = about.year_to
    ? `${about.year_from} - ${about.year_to}`
    : about.year_from

  return (
    <>
      <Title title={title} />
      <FormAbout about={about} id={about._id} />
    </>
  )
}
