import { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { TUser } from "@/types/globalType";

declare module 'next-auth' {
  interface Session {
    user: TUser
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    email?: string | null
  }
}
