import { Button } from "@/components/ui/button";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useLike } from "@/hooks/use-like";
import { useLikeStatus } from "@/hooks/use-likeStatus";
interface likeProps {
  idThread: number;
  likeCount: number;
}

export function LikeButton({ idThread, likeCount }: likeProps) {
  const { data: isLike } = useLikeStatus(idThread);
  const { muatateLike } = useLike();

  const handleLikeToogle = () => {
    muatateLike(idThread);
    
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
