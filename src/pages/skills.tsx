import Head from 'next/head'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import 'devicon'
import Layout from '@/components/layouts/default'
import PageTitle from '@/components/PageTitle'
import ProgressCircle from '@/components/ProgressCircle'
import { connectToDatabase } from '../util/mongodb'

export async function getStaticProps() {
  const { db } = await connectToDatabase()

  const skills = await db.collection('skills').find({}).toArray()
  const experience = await db
    .collection('experience')
    .find({})
    .sort({ name: 1 })
    .toArray()

  return {
    props: {
      skills: JSON.parse(JSON.stringify(skills)),
      experience: JSON.parse(JSON.stringify(experience))
    },
    revalidate: 60 // In seconds
  }
}

function SkillItems(skills) {
  const skillItems = skills.items.map((item, index) => {
    return (
      <Grid key={index} item xs={6} sm={6} md={3}>
        <Box textAlign="center" className="skill-item">
          <ProgressCircle data={item} />
        </Box>
      </Grid>
    )
  })

  return skillItems
}

function ExperienceItems(experience) {
  const experienceItems = experience.items.map((item, index) => {
    return (
      <Box key={index} className="devicon" m={3}>
        <i className={item.icon}></i>
        <span>{item.name}</span>
      </Box>
    )
  })

  return experienceItems
}

export default function Skills({ skills, experience }) {
  return (
    <Layout>
      <Head>
        <title>{`Skills | ${process.env.siteTitle}`}</title>
      </Head>
      <PageTitle>Skills</PageTitle>
      <Grid container spacing={5} justifyContent="center">
        <SkillItems items={skills} />
      </Grid>
      <Box textAlign="center" pt={10} pb={2}>
        <h3>I Have Experience With:</h3>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
      >
        <ExperienceItems items={experience} />
      </Box>
    </Layout>
  )
}
