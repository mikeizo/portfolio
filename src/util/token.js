import { jwtVerify } from 'jose'

export async function verifyToken(token) {
  const secret = new TextEncoder().encode(process.env.HASH_SECRET)

  try {
    const { payload } = await jwtVerify(token.toString(), secret)

    return payload
  } catch (error) {
    return null
  }
}

export function requirePageAuth(token) {
  const profile = verifyToken(token)
  return profile
}
