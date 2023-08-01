import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { HttpStatusCode } from 'axios'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const res = await prisma.role.create({
      data: {
        name: body?.name,
        type: body?.type,
        userId: body?.userId,
      },
    })

    return NextResponse.json({
      status: HttpStatusCode.Created,
      data: res,
      message: 'Created role success!',
    })
  } catch (error) {
    return error
  }
}
