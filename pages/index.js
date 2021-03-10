import { useEffect } from 'react'
import { connectToDatabase } from '../util/mongodb'
import Head from 'next/head'
import Box from '@material-ui/core/Box'
import Astronaut from '../components/Astronaut'
import gsap from 'gsap'

export async function getStaticProps() {
  const { db } = await connectToDatabase()
  const settings = await db.collection('settings').findOne({})

  return {
    props: {
      settings: JSON.parse(JSON.stringify(settings))
    },
    revalidate: 60 // In seconds
  }

}

export default function Home({ settings }) {
  // Remove html tags
  let stripAbout = settings.about.replace(/(<([^>]+)>)/gi, '')

  useEffect(() => {
    gsap.from('.vertical', {
      y: -100,
      opacity: 0,
      ease: 'easeIn',
      duration: 2,
      delay: 0.5
    })

    gsap.from('.title-home', {
      x: 200,
      opacity: 0,
      ease: 'easeIn',
      duration: 2,
      delay: 1.5
    })

    /**
     * Moon animation
     */
    // Fade in
    gsap.from('#moon', {
      x: 0,
      y: 100,
      scale: -0.5,
      ease: 'easeIn',
      duration: 6
    })
    // Spin
    gsap.timeline({ repeat: -1 }).to('#moon', {
      rotate: 1080,
      duration: 300,
      repeatDelay: 0
    })
  }, [])

  return (
    <>
      <Head>
        <title>{process.env.siteTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={stripAbout} />
        <meta property="og:image" content="https://mtropea.s3.amazonaws.com/portfolio/miketropea1.png" />
      </Head>
      <Astronaut />
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        className="home-title"
        mt={-10}
      >
        <Box>
          <h1 className="outline vertical">Web</h1>
        </Box>
        <Box>
          <h1 className="title-home">
            Developer <br />
            &amp;&nbsp;Designer
          </h1>
        </Box>
      </Box>
      <div id="moon"></div>
    </>
  )
}
