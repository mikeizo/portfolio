import Head from 'next/head'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import ChangingProgressProvider from '../components/ChangingProgressProvider'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'
import { connectToDatabase } from '../util/mongodb'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import 'devicon'

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
          <ChangingProgressProvider valueStart={0} valueEnd={item.percent}>
            {(value) => (
              <CircularProgressbar
                value={value}
                text={`${value}%`}
                circleRatio={0.75}
                styles={buildStyles({
                  rotation: 1 / 2 + 1 / 8,
                  pathTransitionDuration: 0.5,
                  pathColor: '#ffffff',
                  textColor: '#ffffff',
                  trailColor: '#999999'
                })}
              />
            )}
          </ChangingProgressProvider>
          {item.name}
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
    <>
      <Head>
        <title>Skills | {process.env.siteTitle}</title>
      </Head>
      <PageTitle>Skills</PageTitle>
      <Grid container spacing={5} justify="center">
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
      <Footer />
    </>
  )
}
