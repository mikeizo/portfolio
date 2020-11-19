import { useEffect } from 'react'
import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin'
import Box from '@material-ui/core/Box'

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(MotionPathPlugin)

    gsap.set('#astronaut', {
      xPercent: -100,
      yPercent: 0,
      transformOrigin: '50%, 50%'
    })
    gsap.timeline({ repeat: -1 }).to('#astronaut', {
      ease: 'none',
      rotate: 1440,
      duration: 50,
      repeatDelay: 0,
      motionPath: {
        path: '#flight-path',
        align: '#flight-path'
      }
    })
  }, [])

  return (
    <>
      <div id="astronaut">
        <img alt="astronaut" src="/img/astronaut.svg" />
      </div>
      <Box className="fixed">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1366 1020">
          <path
            id="flight-path"
            fill="none"
            stroke="#none"
            d="M5.5 375.5c0-210 245-364 702-364s649 154 649 364c0 205-196 635-659 635s-692-431-692-635z"
          />
        </svg>
      </Box>
    </>
  )
}
