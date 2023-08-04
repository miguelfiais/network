import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import LikePost from "./LikePost";
import NewComment from "./NewComment";

interface ItemPostProps {
  data: {
    User: {
      name: string | null;
      image: string | null;
    };
    id: string;
    content: string;
    created_at: Date;
    comments: {}[];
    likes: {
      id: string;
      created_at: Date;
      updated_at: Date;
      postId: string;
      userEmail: string;
    }[];
  };
}

const ItemPost = ({ data }: ItemPostProps) => {
  return (
    <div className="p-5 bg-white shadow-md rounded-lg mt-5">
      <div className="flex items-center gap-3">
        <Image
          src={data.User.image!}
          alt={data.User.name!}
          width={36}
          height={36}
          className="rounded-lg"
        />
        <div className="flex flex-col">
          <p className="text-sm font-medium">{data.User.name}</p>
          <p className="text-xs text-gray-400 capitalize">
            {format(new Date(data.created_at), "dd MMMM HH:mm", {
              locale: ptBR,
            })}
          </p>
        </div>
      </div>
      <p className="mt-3 mb-1 whitespace-pre-wrap">{data.content}</p>
      <div className="flex items-center justify-between mt-3">
        <LikePost postId={data.id} liked={data.likes} />
        <div className="text-xs text-gray-400 flex items-center justify-end gap-3">
          <p>{data.likes.length}-Likes</p>
          <Link href={`/post/${data.id}`}>
            <p>{data.comments.length}-Comentários</p>
          </Link>
        </div>
      </div>

      <NewComment postId={data.id} />
    </div>
  );
};

export default ItemPost;
