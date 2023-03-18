import { InferGetServerSidePropsType } from 'next'
import Title from '@/components/admin/Title'
import FormWork from '@/components/admin/FormWork'
import AdminLayout from '@/components/layouts/admin'
import { QueryParam } from '@/types'
import { connectToDatabase } from '@/util/mongodb'
import { ObjectId } from 'mongodb'

export async function getServerSideProps({ query }: QueryParam) {
  const { db } = await connectToDatabase()
  const work = await db
    .collection('work')
    .findOne({ _id: new ObjectId(query.id) })

  return {
    props: {
      work: JSON.parse(JSON.stringify(work))
    }
  }
}

export default function AdminWorkId({
  work
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <AdminLayout>
      <Title title={work.name} />
      <FormWork work={work} id={work._id} />
    </AdminLayout>
  )
}
