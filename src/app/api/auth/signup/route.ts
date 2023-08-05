import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { HttpStatusCode } from 'axios'
import { hash } from 'bcrypt'

export async function POST(req: Request) {
  const num: number = 10
  try {
    const body = await req.json()

    const hashPass: string = await hash(body.password, num)

    const findUser = await prisma.user.findFirst({
      where: {
        email: body.email
      }
    })

    if(findUser) {
      return NextResponse.json({
        status: HttpStatusCode.Conflict,
        message: 'Email already exists!'
      })
    }

    const res = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashPass,
        roleId: body.roleId,
      },
    })

    return NextResponse.json({
      status: HttpStatusCode.Created,
      data: res,
      message: 'Sign Up success!',
    })
  } catch ( error ) {
    return NextResponse.json({
      status: HttpStatusCode.InternalServerError,
      message: error,
    })
  }
}
