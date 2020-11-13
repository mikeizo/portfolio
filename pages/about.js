import { connectToDatabase } from '../util/mongodb'
import { useEffect } from 'react'
import { Fade } from 'react-reveal'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Head from 'next/head'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import PageTitle from '../components/PageTitle'

export async function getServerSideProps() {
  const { db } = await connectToDatabase()
  const settings = await db.collection('settings').findOne({})
  const about = await db.collection('about').find({}).toArray()

  return {
    props: {
      settings: JSON.parse(JSON.stringify(settings)),
      about: JSON.parse(JSON.stringify(about))
    }
  }
}

function TimelineItems(about) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.utils.toArray('.timeline-year').forEach((year) => {
      gsap.from(year, {
        scrollTrigger: {
          trigger: year,
          start: 'top 80%',
          end: 'bottom 90%',
          scrub: 1
          //markers: true
        },
        x: -100,
        opacity: 0,
        ease: 'none',
        duration: 3
      })
    })

    gsap.utils.toArray('.timeline-description').forEach((year) => {
      gsap.from(year, {
        scrollTrigger: {
          trigger: year,
          start: 'top 80%',
          end: 'bottom 90%',
          scrub: 1
          //markers: true
        },
        x: 100,
        opacity: 0,
        ease: 'none',
        duration: 3
      })
    })
  }, [])

  const timelineItems = about.items.map((item) => {
    return (
      <Grid
        container
        key={item._id}
        className="timeline-item"
        justify="space-between"
      >
        <Grid item className="timeline-year" sm={3}>
          <Box>{item.year_from}</Box>
        </Grid>
        <Grid item sm={8} className="timeline-description">
          <Box dangerouslySetInnerHTML={{ __html: item.description }} />
        </Grid>
      </Grid>
    )
  })

  return timelineItems
}

export default function About({ settings, about }) {
  return (
    <>
      <Head>
        <title>About | {process.env.siteTitle}</title>
      </Head>
      <PageTitle>About Me</PageTitle>
      <Grid container spacing={5} justify="space-between">
        <Grid item xs={12} sm={8} md={8}>
          <Fade left>
            <div dangerouslySetInnerHTML={{ __html: settings.about }} />
          </Fade>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box textAlign="center">
            <Fade right>
              <img
                className="img-fluid about-photo"
                src="/img/mike-tropea.jpg"
                alt="Mike Tropea"
              />
            </Fade>
          </Box>
        </Grid>
      </Grid>

      <Box textAlign="center" my={10}>
        <h2 className="message">My Journey</h2>
      </Box>
      <Box className="timeline" mt={5} mb={10}>
        <TimelineItems items={about} />
      </Box>
    </>
  )
}
