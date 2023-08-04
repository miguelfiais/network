import { prisma } from "@/lib/prisma";
import ItemPost from "./ItemPost";

const getPosts = async () => {
  const allPosts = await prisma.post.findMany({
    select: {
      User: true,
      id: true,
      content: true,
      created_at: true,
      updated_at: true,
      comments: true,
      likes: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return allPosts;
};

const Feed = async () => {
  const data = await getPosts();
  return (
    <div className="container mx-auto">
      {data.map((post) => (
        <ItemPost key={post.id} data={post} />
      ))}
    </div>
  );
};

export default Feed;
