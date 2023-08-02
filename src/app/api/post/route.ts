import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface ReqProps {
  content: string;
  email: string;
}

export async function POST(request: Request) {
  const { email, content } = (await request.json()) as ReqProps;

  if (!email) {
    return new NextResponse(
      JSON.stringify({
        error: "UNAUTHENTICATED",
      }),
      {
        status: 404,
      }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
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

  if (!content) {
    return new NextResponse(
      JSON.stringify({
        error: "POST_INVALID",
      }),
      {
        status: 400,
      }
    );
  }

  const newPost = await prisma.post.create({
    data: {
      content,
      User: {
        connect: {
          email,
        },
      },
    },
  });

  return new NextResponse(
    JSON.stringify({
      success: true,
      newPost,
    })
  );
}
