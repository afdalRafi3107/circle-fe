import { useFollow } from "@/hooks/use-follow";
import { Button } from "@/components/ui/button";
import { useFollowStatus } from "@/hooks/use-followStatus";

type FollowProps = {
  userId: number;
};

export function FollowButton({ userId }: FollowProps) {
  const { data: isFollow, refetch } = useFollowStatus(userId);

  // cek ambil id user yang login

  console.log("sudah follow kah?", isFollow);

  const { mutateFollowing } = useFollow();

  const handleToggleFollow = async (userId: number) => {
    try {
      await mutateFollowing(userId);
      await refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      onClick={() => handleToggleFollow(userId)}
      variant={null}
      className={`border-2 px-3 py-1 rounded-full text-sm cursor-pointer ${
        isFollow?.isFollowing
          ? "border-gray-400 text-gray-400"
          : "border-white text-white"
      }`}
    >
      {isFollow?.isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}
