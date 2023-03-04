import { connectToDatabase } from '@/util/mongodb'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import cookie from 'cookie'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, pass } = req.body.formData
    const { db } = await connectToDatabase()
    const user = await db
      .collection('users')
      .findOne({ email: email.toLowerCase() })

    if (user) {
      compare(pass, user.pass, function (err, result) {
        // Success
        if (!err && result) {
          // Create jason web token
          const create = {
            sub: user._id,
            email: user.email,
            name: user.name,
            role: user.role
          }
          const jwt = sign(create, process.env.HASH_SECRET, { expiresIn: '1h' })

          // Store jwt cookie
          res.setHeader(
            'Set-Cookie',
            cookie.serialize('auth', jwt, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== 'development',
              sameSite: 'strict',
              maxAge: 3600 * 24,
              path: '/'
            })
          )
          // Send response
          res.status(200).send('Success')
          // Failed
        } else {
          res.status(401).end()
        }
      })
    } else {
      res.status(401).end()
    }
  } else {
    // Method not allowed
    res.status(405).end()
  }
}

export default handler
