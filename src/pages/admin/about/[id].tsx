import { InferGetServerSidePropsType } from 'next'
import Title from '@/components/admin/Title'
import FormAbout from '@/components/admin/FormAbout'
import AdminLayout from '@/components/layouts/admin'
import { QueryParam } from '@/types'
import { connectToDatabase } from '@/util/mongodb'
import { ObjectId } from 'mongodb'

export async function getServerSideProps({ query }: QueryParam) {
  const { db } = await connectToDatabase()
  const about = await db
    .collection('about')
    .findOne({ _id: new ObjectId(query.id) })

  return {
    props: {
      about: JSON.parse(JSON.stringify(about))
    }
  }
}

export default function AdminAboutId({
  about
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const title = about.year_to
    ? `${about.year_from} - ${about.year_to}`
    : about.year_from

  return (
    <AdminLayout>
      <Title title={title} />
      <FormAbout about={about} id={about._id} />
    </AdminLayout>
  )
}
