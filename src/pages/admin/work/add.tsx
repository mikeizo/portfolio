import Title from '@/components/admin/Title'
import FormWork from '@/components/admin/FormWork'
import AdminLayout from '@/components/layouts/admin'
// import { requirePageAuth } from '@/util/token'

// export async function getServerSideProps({ req }) {
//   // Authenticate user
//   const profile = requirePageAuth(req.cookies.auth)
//   if (!profile) {
//     return {
//       redirect: { destination: process.env.adminLogin, permanent: false }
//     }
//   }
//   return {
//     props: {}
//   }
// }

export default function AdminWorkAdd() {
  const work = {}

  return (
    <AdminLayout>
      <Title title="Add Work" />
      <FormWork work={work} id="" />
    </AdminLayout>
  )
}
