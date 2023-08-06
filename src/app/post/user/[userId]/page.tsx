import ItemPost from "@/app/components/ItemPost";
import { prisma } from "@/lib/prisma";

const fetchUserPosts = async (userId: string) => {
  const userPosts = await prisma.post.findMany({
    where: {
      User: {
        id: userId,
      },
    },
    select: {
      User: true,
      comments: true,
      content: true,
      created_at: true,
      likes: true,
      id: true,
    },
  });
  return userPosts;
};

const UserPosts = async ({ params }: { params: { userId: string } }) => {
  const data = await fetchUserPosts(params.userId);

  return (
    <div className="bg-gray-100 h-[calc(100vh-74.29px)] overflow-y-auto">
      <div className="p-5">
        {data.map((post) => (
          <ItemPost key={post.id} data={post} />
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
