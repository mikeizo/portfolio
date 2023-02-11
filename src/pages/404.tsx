import Head from 'next/head'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Layout from '@/components/layouts/default'
import Astronaut from '@/components/img/Astronaut'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>404 Not Found</title>
      </Head>
      <Astronaut />
      <div className="container">
        <Box textAlign="center" mb={5}>
          <h1>404</h1>
          <h4>Sorry, this page seems to be lost in space</h4>
        </Box>
        <Box textAlign="center" mb={5}>
          <Link href="/" className="btn btn-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="20"
              viewBox="5 0 30 30"
              className="arrow"
            >
              <path d="M7.7,14.3l9.6-9.6c0.9-0.9,2.3-0.9,3.2,0l0.8,0.8c0.9,0.9,0.9,2.3,0,3.2L14,16l7.3,7.3 c0.9,0.9,0.9,2.3,0,3.2l-0.8,0.8c-0.9,0.9-2.3,0.9-3.2,0l-9.6-9.6C7.2,17.3,7,16.6,7.1,16C7,15.4,7.2,14.7,7.7,14.3z" />
            </svg>
            Back to Home Page
          </Link>
        </Box>
      </div>
      {/* <div id="moon"></div> */}
    </Layout>
  )
}
