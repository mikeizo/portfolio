import { verify } from 'jsonwebtoken'

export function verifyToken(token) {
  try {
    return verify(token, process.env.HASH_SECRET)
  } catch (error) {
    return null
  }
}

export function requirePageAuth(token) {
  const profile = verifyToken(token)
  return profile
}
