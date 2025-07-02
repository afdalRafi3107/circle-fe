import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdOutlineInsertComment } from "react-icons/md";
import { UseThread } from "@/hooks/use-thread";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { apiUpload } from "@/utils/urlimg";
import { useToggleLikeThread } from "@/hooks/use-like";
import { UseProfile } from "@/hooks/use-profile";

export function ThreadList() {
  const [Liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const klikLike = () => {
    setLiked(!Liked);
  };

  const { data: thread, isLoading, isError } = UseThread();
  const { data: user } = UseProfile();

  const { mutate: toogleLike } = useToggleLikeThread();

  useEffect(() => {
    if (thread) {
      setLiked(thread.isLike);
      setLikeCount(thread._count?.like);
    }
  }, [thread]);
  const handleLikeToogle = async () => {
    if (!thread) return;
    try {
      setLiked((prev) => !prev);
      setLikeCount((prev) => (Liked ? prev - 1 : prev + 1));
      toogleLike(thread.id);
    } catch (error) {
      console.log("Error toogling like: ", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !thread) return <div>Gagal Mengambil thread</div>;
  console.log("thread list : ", thread);
  console.log("user yang Login : ", user);

  return (
    <>
      {thread.map((thread: any) => (
        <div className="flex gap-4 p-3 border-b-2 border-gray-700">
          <img
            src={
              thread.author.profile?.[0]?.photoProfile
                ? `${apiUpload}${thread.author.profile?.[0].photoProfile}`
                : "/defaultIMG/defaultP.jpg"
            }
            alt=""
            className="w-12 h-12 rounded-4xl"
          />
          <div>
            <div className="flex items-center gap-2">
              <NavLink
                to={
                  user?.id == thread.author?.id
                    ? `/profile`
                    : `/user-profile/${thread.author.id}`
                }
                className="hover:underline"
              >
                <p>{thread.author.profile?.[0]?.name}</p>
              </NavLink>
              <NavLink to={`/user-profile/${thread.author?.id}`}>
                <p className="text-sm text-gray-400">
                  @{thread.author.username}
                </p>
              </NavLink>
              <p className="text-sm text-gray-400">•</p>
              <p className="text-sm text-gray-400">
                {getRelatifTime(new Date(thread.createAt))}
              </p>
            </div>
            <div className="flex flex-col gap-2  w-240">
              <NavLink to={`/detail-thread/${thread.id}`}>
                <p className="text-sm text-gray-200 text-justify">
                  {thread.content}
                </p>
                <img
                  src={`${apiUpload}${thread.img}`}
                  alt=""
                  className="w-80 rounded-2xl"
                />
              </NavLink>
            </div>
            {/* likes and comments */}
            <div className="flex gap-3 pt-2">
              {/* likes */}
              <div className="flex items-center cursor-pointer hover:text-red-400">
                <Button
                  onClick={handleLikeToogle}
                  className={`p-0 w-0 h-auto cursor-pointer bg-none text-gray-400 hover:text-red-400`}
                >
                  {Liked ? (
                    <FaHeart size={15} className="text-red-700" />
                  ) : (
                    <FaRegHeart size={15} className="" />
                  )}
                </Button>
                <p>{thread._count.like}</p>
              </div>
              {/* commens */}
              <div className="flex items-center cursor-pointer ">
                <Button variant={null} className="w-0 h-0">
                  <MdOutlineInsertComment />
                </Button>
                <p>{thread._count.reply}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function getRelatifTime(postTime: Date): string {
  const now = new Date();
  const postDate = postTime.getTime();

  const nowTime = now.getDate();

  const SelisihDalamDetik = Math.floor((now.getTime() - postDate) / 10000);

  const InSecond = SelisihDalamDetik * -1;
  console.log("detik : ", InSecond);
  const SelisihDalamMenit = Math.floor(InSecond / 60);
  const SelisihDalamJam = Math.floor(SelisihDalamMenit / 60);
  const SelisihDalamHari = Math.floor(SelisihDalamJam / 24);

  if (InSecond < 60) {
    return `${SelisihDalamDetik}s ago`;
  } else if (SelisihDalamMenit < 60) {
    return `${SelisihDalamMenit}m ago`;
  } else if (SelisihDalamJam < 24) {
    return `${SelisihDalamJam}h ago`;
  } else {
    return `${SelisihDalamHari}d ago`;
  }
}
