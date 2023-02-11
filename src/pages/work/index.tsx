import Head from 'next/head'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Layout from '@/components/layouts/default'
import PageTitle from '@/components/PageTitle'
import { connectToDatabase } from '@/util/mongodb'

export async function getStaticProps() {
  const { db } = await connectToDatabase()

  type Work = {
    name: string
    description: string
    resources: string[]
    url: string
    logo: string
    images: string[]
    slug: string
    weight: number
    git: string
    created: string
  }

  const work: Work = await db
    .collection('work')
    .find({})
    .sort({ weight: 1 })
    //.limit(20)
    .toArray()

  return {
    props: {
      work: JSON.parse(JSON.stringify(work))
    },
    revalidate: 60 // In seconds
  }
}

function WorkItems(work) {
  const workItems = work.items.map((item) => {
    return (
      <Grid item key={item._id} p={5} xs={12} sm={6} md={4}>
        <Link href={`work/[slug]`} as={`work/${item.slug}`}>
          <Box className="work-item">
            <img
              className="img-fluid"
              src={`${process.env.awsS3Logo}${item.logo}`}
              alt={item.name}
            />
          </Box>
          <Box mt={3}>
            <p>{item.name}</p>
          </Box>
        </Link>
      </Grid>
    )
  })

  return workItems
}

export default function Work({ work }) {
  return (
    <Layout>
      <Head>
        <title>{`Work | ${process.env.siteTitle}`}</title>
      </Head>
      <PageTitle>Work</PageTitle>
      <Grid container spacing={4} id="work">
        <WorkItems items={work} />
      </Grid>
    </Layout>
  )
}
