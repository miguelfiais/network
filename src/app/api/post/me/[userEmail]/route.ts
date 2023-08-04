import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params: { userEmail } }: { params: { userEmail: string } }
) {
  if (!userEmail) {
    return {
      status: 400,
      body: {
        message: "Missing userEmail",
      },
    };
  }
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (!user) {
    return new NextResponse(
      JSON.stringify({
        error: "USER_NOT_FOUND",
      }),
      {
        status: 404,
      }
    );
  }
  const posts = await prisma.post.findMany({
    where: {
      userEmail,
    },
    select: {
      User: true,
      id: true,
      content: true,
      created_at: true,
      updated_at: true,
      comments: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return new NextResponse(JSON.stringify(posts), { status: 200 });
}
