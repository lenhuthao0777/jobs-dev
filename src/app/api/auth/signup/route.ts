import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { HttpStatusCode } from 'axios'

export async function GET() {
  try {
    return NextResponse.json({
      name: 'hao',
    })
  } catch (error) {
    return error
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const res = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
        roleId: body.roleId,
      },
    })

    return NextResponse.json({
      status: HttpStatusCode.Created,
      data: res,
      message: 'Sign Up success!',
    })
  } catch (error) {
    return NextResponse.json({
      status: HttpStatusCode.InternalServerError,
      message: error,
    })
  }
}
