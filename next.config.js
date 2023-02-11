/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    siteTitle: 'Mike Tropea - Website Portfolio',
    awsS3: 'https://mtropea.s3.amazonaws.com/portfolio/',
    awsS3Logo: 'https://mtropea.s3.amazonaws.com/portfolio/logos/',
    adminLogin: '/admin/login'
  },
  images: {
    domains: ['mtropea.s3.amazonaws.com']
  }
}

module.exports = nextConfig
