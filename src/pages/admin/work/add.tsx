import Title from '@/components/admin/Title'
import FormWork from '@/components/admin/FormWork'
import AdminLayout from '@/components/layouts/admin'

export default function AdminWorkAdd() {
  const work = {}

  return (
    <AdminLayout>
      <Title title="Add Work" />
      <FormWork work={work} id="" />
    </AdminLayout>
  )
}
