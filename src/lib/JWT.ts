import jwt, { JwtPayload } from 'jsonwebtoken'

interface SignInOptions {
  expiresIn?: string | number
}

const DEFAULT_SIGN_OPTIONS = {
  expiresIn: '1h'
}

export function SignInJwtAccessToken(payload: JwtPayload, options: SignInOptions = DEFAULT_SIGN_OPTIONS) {
  const secretKey: string | any = process.env.SECRET_KEY
  const token: string = jwt.sign(payload, secretKey as string, options)
  return token
}

export async function verifyJwt(token: string) {
  const secretKey: string | undefined = process.env.SECRET_KEY
  const decoded = jwt.verify(token, secretKey as string)
  return decoded
}
