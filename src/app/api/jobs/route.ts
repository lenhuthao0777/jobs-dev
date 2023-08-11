import prisma from "@/lib/prisma";
import { Job } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body: Job & {
    skillId: string[];
  } = await req.json();
  try {
    const res = await prisma.job.create({
      data: {
        title: body.title,
        location: body.location,
        locationCode: body.locationCode,
        level: body.level,
        typeWorking: body.typeWorking,
        salaryRange: body.salaryRange,
        content: body.content as string,
        userId: body.userId,
      },
    });

    if (res) {
      const data = body?.skillId.map((item: string) => ({
        jobId: res.id,
        skillId: item,
      }));

      await prisma.skillOnJob.createMany({
        data,
      });
    }
    return NextResponse.json({
      status: HttpStatusCode.Created,
      data: res,
      message: "Create job success!",
    });
  } catch (error) {
    return NextResponse.json({
      status: HttpStatusCode.InternalServerError,
      message: error,
    });
  }
}
