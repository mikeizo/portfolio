import Head from 'next/head'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'
import Layout from '@/components/layouts/default'
import PageTitle from '@/components/PageTitle'
import { connectToDatabase } from '@/util/mongodb'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

SwiperCore.use([Navigation, Pagination, Autoplay])

export async function getServerSideProps({ query, res }) {
  const { slug } = query
  const { db } = await connectToDatabase()
  const work = await db.collection('work').findOne({ slug: slug })

  // Page not found
  if (!work) {
    res.writeHead(301, { Location: '/404' })
    res.end()
  }

  return {
    props: {
      work: JSON.parse(JSON.stringify(work))
    }
  }
}

function formatURL(url) {
  if (url) {
    const result = url.replace(/(^\w+:|^)\/\//, '')
    return result
  }
}

export default function Work({ work }) {
  return (
    <Layout>
      <Head>
        <title>{`${work.name} | ${process.env.siteTitle}`}</title>
      </Head>
      <PageTitle>{work.name}</PageTitle>
      <Box mb={5}>
        <Grid container spacing={0}>
          <Grid className="description" item xs={12}>
            <p>{work.description}</p>
          </Grid>
          <Grid className="carousel" item xs={12} md={9}>
            {work.images ? (
              <Swiper
                spaceBetween={30}
                slidesPerView={1}
                navigation
                autoplay
                pagination={{ clickable: true }}
              >
                {work.images.map((item, index) => (
                  <SwiperSlide key={index}>
                    <img
                      className="img-fluid"
                      src={`${process.env.awsS3}${item}`}
                      alt={work.name}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Box px={5}>
                <img className="img-fluid" src="/img/default.gif" />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={3}>
            <h2>Info</h2>
            <hr />
            {work.url && (
              <Box my={4}>
                <h4>Website: </h4>
                <a href={work.url} target="_blank" rel="noreferrer nofollow">
                  {formatURL(work.url)}
                </a>
              </Box>
            )}
            {work.git && (
              <Box my={4}>
                <h4>Git: </h4>
                <a href={work.git} target="_blank" rel="noreferrer nofollow">
                  {formatURL(work.git)}
                </a>
              </Box>
            )}
            {work.resources && (
              <Box my={4}>
                <h4>Bulit With:</h4>
                <ul className="work-list">
                  {work.resources.map((items, index) => (
                    <li key={index}>{items}</li>
                  ))}
                </ul>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}
