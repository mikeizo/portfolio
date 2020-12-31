import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Layout from '../layouts/layout'
import Admin from '../layouts/admin'
import '../styles/style.scss'
import * as gtag from '../util/gtag'

export default function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  if (router.pathname.startsWith('/admin')) {
    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        {router.pathname.startsWith('/admin/login') ? (
          <Component {...pageProps} />
        ) : (
          <Admin>
            <Component {...pageProps} />
          </Admin>
        )}
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </React.Fragment>
    )
  }
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}
