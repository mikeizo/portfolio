import { connectToDatabase } from '../../util/mongodb'
import Link from 'next/link'
import Head from 'next/head'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import PageTitle from '../../components/PageTitle'
import { Zoom } from 'react-reveal'

export async function getServerSideProps() {
  const { db } = await connectToDatabase()

  const work = await db
    .collection('work')
    .find({})
    .sort({ weight: 1 })
    //.limit(20)
    .toArray()

  return {
    props: {
      work: JSON.parse(JSON.stringify(work))
    }
  }
}

function WorkItems(work) {
  let index = 0
  const workItems = work.items.map((item) => {
    index += 100
    return (
      <Grid key={item._id} item p={5} xs={12} sm={6} md={4}>
        <Zoom delay={index}>
          <Link href={`work/[slug]`} as={`work/${item.slug}`}>
            <a>
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
            </a>
          </Link>
        </Zoom>
      </Grid>
    )
  })

  return workItems
}

export default function Work({ work }) {
  return (
    <>
      <Head>
        <title>Work | {process.env.siteTitle}</title>
      </Head>
      <PageTitle>Work</PageTitle>
      <Grid container spacing={10} id="work">
        <WorkItems items={work} />
      </Grid>
    </>
  )
}
