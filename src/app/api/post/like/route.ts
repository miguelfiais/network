import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface ReqProps {
  postId: string;
  userEmail: string;
}
export async function POST(request: Request) {
  const { postId, userEmail } = (await request.json()) as ReqProps;

  if (!userEmail) {
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

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return new NextResponse(
      JSON.stringify({
        error: "POST_NOT_FOUND",
      }),
      {
        status: 404,
      }
    );
  }

  const like = await prisma.like.create({
    data: {
      postId,
      userEmail,
    },
  });
  return new NextResponse(JSON.stringify(like), { status: 200 });
}
