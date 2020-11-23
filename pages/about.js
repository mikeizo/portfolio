import { useState } from 'react'
import { useEffect } from 'react'
import { connectToDatabase } from '../util/mongodb'
import { Fade } from 'react-reveal'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Head from 'next/head'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import Grid from '@material-ui/core/Grid'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'

export async function getStaticProps() {
  const { db } = await connectToDatabase()
  const settings = await db.collection('settings').findOne({})
  const about = await db
    .collection('about')
    .find({})
    .sort({ year_from: 1 })
    .toArray()

  return {
    props: {
      settings: JSON.parse(JSON.stringify(settings)),
      about: JSON.parse(JSON.stringify(about))
    },
    revalidate: 60 // In seconds
  }
}

export default function About({ settings, about }) {
  const [open, setOpen] = useState(false)
  const [portfolio, setPortfolio] = useState('')

  function openDialog(value) {
    setPortfolio(value)
    setOpen(true)
  }
  function closeDialog() {
    setOpen(false)
  }

  function Modal() {
    return (
      <Dialog open={open} onClose={closeDialog} maxWidth="lg">
        <img
          src={`/img/old-sites/${portfolio}`}
          alt="Portfolio"
          className="img-fluid"
        />
      </Dialog>
    )
  }

  function TimelineItems(about) {
    useEffect(() => {
      gsap.registerPlugin(ScrollTrigger)
      gsap.utils.toArray('.timeline-year').forEach((year) => {
        gsap.from(year, {
          scrollTrigger: {
            trigger: year,
            start: 'top 70%',
            end: 'bottom 80%',
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
            start: 'top 70%',
            end: 'bottom 80%',
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
          justify="center"
        >
          <Grid item sm={12} md={2}>
            <Box
              className="timeline-year"
              display="flex"
              flexWrap="wrap"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              {item.year_to ? (
                <>
                  <Box>{item.year_from}</Box>
                  <Box>
                    <span>to</span>
                  </Box>
                  <Box>{item.year_to}</Box>
                </>
              ) : (
                <Box>{item.year_from}</Box>
              )}
            </Box>
          </Grid>
          <Grid item sm={12} md={1}></Grid>
          <Grid item sm={12} md={8}>
            <Box
              className="timeline-description"
              display="flex"
              alignItems="center"
            >
              <Box>
                {item.description}
                {item.image && (
                  <>
                    <span>&nbsp;-&nbsp;</span>
                    <a onClick={() => openDialog(item.image)}>View</a>
                  </>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      )
    })
    return timelineItems
  }

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
        <Modal />
      </Box>
      <Footer />
    </>
  )
}
