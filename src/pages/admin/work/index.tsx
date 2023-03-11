import DataTable from '@/components/admin/DataTable'
import Title from '@/components/admin/Title'
import AdminLayout from '@/components/layouts/admin'
import { connectToDatabase } from '@/util/mongodb'

const headCells = [
  { id: 'name', align: 'left', label: 'Name' },
  { id: 'slug', label: 'Slug' },
  { id: 'weight', align: 'center', label: 'Weight' },
  { id: 'url', label: 'Url' },
  { id: 'created', label: 'Created' },
  { id: 'updated', label: 'Updated' }
]

export async function getServerSideProps() {
  const { db } = await connectToDatabase()
  const work = await db
    .collection('work')
    .find({})
    .sort({ weight: 1 })
    .toArray()

  return {
    props: {
      work: JSON.parse(JSON.stringify(work))
    }
  }
}

export default function AdminWork({ work }) {
  return (
    <AdminLayout>
      <Title title="Work" addLink="work/add" />
      <DataTable data={work} headCells={headCells} pageName="work" />
    </AdminLayout>
  )
}
