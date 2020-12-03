//import { useEffect } from 'react'
//import { useRouter } from 'next/router'
//import Scrollbar from 'smooth-scrollbar'
import Header from '../components/Header'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

export default function Layout({ children }) {
  /*
  const router = useRouter()
  useEffect(() => {
    // Disable smooth-scrollbar on homepage and mobile
    if (router.pathname !== '/' && window.innerWidth >= 960) {
      Scrollbar.init(document.querySelector('#smooth-scrollbar'))
    }
  }, [])
  */

  return (
    <Box id="app">
      <div className="stars" id="stars-sm"></div>
      <div className="stars" id="stars-md"></div>
      <div className="stars" id="stars-lg"></div>
      <Header />
      <Container>
        <main>{children}</main>
      </Container>
    </Box>
  )
}
