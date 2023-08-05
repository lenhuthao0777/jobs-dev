import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { HttpStatusCode } from 'axios'
import { TResponse } from "@/types/globalType";


export async function GET() {
  try {
    const res = await prisma.role.findMany()

    return NextResponse.json({
      status: HttpStatusCode.Ok,
      data: res,
      message: 'Get role success!'
    })
  } catch ( error ) {
    NextResponse.json({
      status: HttpStatusCode.InternalServerError,
      message: error
    })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const res = await prisma.role.create({
      data: {
        name: body?.name,
        type: body?.type,
      },
    })

    return NextResponse.json({
      status: HttpStatusCode.Created,
      data: res,
      message: 'Created role success!',
    })
  } catch ( error ) {
    return error
  }
}
