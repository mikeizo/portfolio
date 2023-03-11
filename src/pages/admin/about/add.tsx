import Title from '@/components/admin/Title'
import FormAbout from '@/components/admin/FormAbout'
import AdminLayout from '@/components/layouts/admin'

export default function AdminAboutAdd() {
  const about = {}

  return (
    <AdminLayout>
      <Title title="Add About" />
      <FormAbout about={about} id="" />
    </AdminLayout>
  )
}
