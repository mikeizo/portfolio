import { verify } from 'jsonwebtoken'

const authenticated = (handler) => (req, res) => {
  verify(
    req.cookies.auth,
    process.env.HASH_SECRET,
    async function (err, decoded) {
      if (decoded.role === 'guest') {
        res.status(401).end()
      } else if (!err && decoded) {
        return await handler(req, res)
      } else {
        res.status(401).end()
      }
    }
  )
}

export default authenticated
