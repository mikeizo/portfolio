import DataTable from '@/components/admin/DataTable'
import Title from '@/components/admin/Title'
import AdminLayout from '@/components/layouts/admin'
import { connectToDatabase } from '@/util/mongodb'

const headCells = [
  { id: 'year_from', align: 'left', label: 'Year From' },
  { id: 'year_to', align: 'left', label: 'Year To' },
  { id: 'description', align: 'left', label: 'Description' },
  { id: 'image', align: 'left', label: 'Image' }
]

export async function getServerSideProps() {
  const { db } = await connectToDatabase()
  const about = await db
    .collection('about')
    .find({})
    .sort({ year_from: 1 })
    .toArray()

  return {
    props: {
      about: JSON.parse(JSON.stringify(about))
    }
  }
}

export default function AdminAbout({ about }) {
  return (
    <AdminLayout>
      <Title title="About" addLink="about/add" />
      <DataTable data={about} headCells={headCells} pageName="about" />
    </AdminLayout>
  )
}
