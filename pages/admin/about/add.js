import Title from '../../../components/admin/Title'
import FormAbout from '../../../components/admin/FormAbout'
import { requirePageAuth } from '../../../util/token'

export async function getServerSideProps({ req }) {
  // Authenticate user
  const profile = requirePageAuth(req.cookies.auth)
  if (!profile) {
    return {
      redirect: { destination: process.env.adminLogin, permanent: false }
    }
  }
  return {
    props: {}
  }
}

export default function AdminAboutAdd() {
  const about = {}

  return (
    <>
      <Title title="Add About" />
      <FormAbout about={about} id="" />
    </>
  )
}
