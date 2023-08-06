import ItemPost from "@/app/components/ItemPost";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

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
      <div className="relative w-full h-1/5">
        <Image
          src="/capa.png"
          alt="foto de capa"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="container mx-auto p-5 -mt-10 relative flex items-center gap-3 pb-0">
        <Image
          src={data[0].User.image!}
          alt={data[0].User.name!}
          width={120}
          height={120}
          className="rounded-full border-2 border-blue-400"
        />
        <div>
          <p className="font-bold text-gray-700 text-lg">
            {data[0].User.name!}
          </p>
          <p className="text-gray-500">{data.length} Publicações</p>
        </div>
      </div>
      <div className="p-5">
        {data.map((post) => (
          <ItemPost key={post.id} data={post} />
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
