import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.HASH_SECRET)

const authenticated = (handler) => async (req, res) => {
  const token = req.cookies.auth ? req.cookies.auth : ''

  try {
    const { payload } = await jwtVerify(token, secret)

    if (payload.role === 'guest') {
      res.status(401).end()
    } else if (payload) {
      return await handler(req, res)
    }
  } catch {
    res.status(401).end()
  }
}

export default authenticated
