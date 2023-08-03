import NewComment from "@/app/components/NewComment";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";

const getPost = async (postId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      User: true,
      content: true,
      created_at: true,
      comments: {
        select: {
          User: true,
          content: true,
          created_at: true,
          id: true,
        },
      },
    },
  });
  return post;
};

const PostPage = async ({ params }: { params: { postId: string } }) => {
  const data = await getPost(params.postId);
  return (
    <div className=" bg-gray-100 h-[calc(100vh-74.29px)] overflow-auto">
      <div className="container mx-auto p-5">
        <div className="bg-white p-5 rounded-xl shadow-md">
          <div className="flex items-center gap-3">
            <Image
              src={data?.User.image!}
              alt={data?.User.name!}
              width={48}
              height={48}
              className="rounded-lg"
            />
            <div className="flex flex-col">
              <p className="text-sm font-medium">{data?.User.name}</p>
              <p className="text-xs text-gray-400 capitalize">
                {format(data?.created_at!, "dd MMMM HH:mm", { locale: ptBR })}
              </p>
            </div>
          </div>
          <p className="mt-3 whitespace-pre-wrap">{data?.content}</p>
          <p className="text-xs text-right text-gray-400 border-t pt-1 pb-2 my-3">
            {data?.comments.length} Comentários
          </p>
          <NewComment postId={params.postId} />
          <div className="border-t my-2"></div>
          <div>
            <div className="flex flex-col gap-3 ">
              {data?.comments.map((comment) => (
                <div key={comment.id} className="p-1 border">
                  <div className="flex items-start gap-3">
                    <Image
                      src={comment?.User.image!}
                      alt={data?.User.name!}
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">
                        {comment?.User.name}
                      </p>
                      <p className="text-xs text-gray-400 capitalize">
                        {format(comment.created_at, "dd MMMM HH:mm", {
                          locale: ptBR,
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
