import { Button } from "@/components/ui/button";

import { FaHeart, FaRegHeart} from "react-icons/fa";
import { useLikeReply } from "@/hooks/use-likeReply";
import { useLikeReplyStatus } from "@/hooks/use-likeReplyStatus";
interface likeProps {
  idReply: number;
  likeCount: number;
}

export function LikeReplyButton({ idReply, likeCount }: likeProps) {
  const { data: isLike} = useLikeReplyStatus(idReply);
  const { mutateLikeReply } = useLikeReply();
  console.log("likeCount : ", likeCount);

  console.log("islikde luar:", isLike);
  const handleLikeToogle = () => {
    mutateLikeReply(idReply);
    // refetch();
    console.log("islikde:", isLike);
    console.log("id yang di like: ", idReply);
  };
  return (
    <div className="flex items-center gap-1">
      <Button
        onClick={handleLikeToogle}
        className={`p-0 w-0 h-auto cursor-pointer bg-none text-gray-400 hover:text-red-400`}
      >
        {isLike?.isLiked ? (
          <FaHeart size={15} className="text-red-700" />
        ) : (
          <FaRegHeart size={15} className="" />
        )}
        <p>{likeCount}</p>
      </Button>
    </div>
  );
}
