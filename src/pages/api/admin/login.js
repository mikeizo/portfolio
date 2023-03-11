import { connectToDatabase } from '@/util/mongodb'
import { compare } from 'bcrypt'
import { SignJWT } from 'jose'
import cookie from 'cookie'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, pass } = req.body.formData
    const { db } = await connectToDatabase()
    const user = await db
      .collection('users')
      .findOne({ email: email.toLowerCase() })

    if (user) {
      compare(pass, user.pass, async function (err, result) {
        // Success
        if (!err && result) {
          // Create jason web token
          const data = {
            sub: user._id,
            email: user.email,
            name: user.name,
            role: user.role
          }
          const secret = new TextEncoder().encode(process.env.HASH_SECRET)
          const alg = 'HS256'

          const jwt = await new SignJWT(data)
            .setProtectedHeader({ alg })
            .setExpirationTime('2h')
            .sign(secret)

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
