import cookie from 'cookie'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('auth', '', { maxAge: 0, path: '/' })
    )
    res.status(200).send('Success')
  } else {
    // Method not allowed
    res.status(405).end()
  }
}

export default handler
