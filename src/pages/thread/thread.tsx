import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdOutlineInsertComment } from "react-icons/md";
import { UseThread } from "@/hooks/use-thread";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

export function ThreadList() {
  const [Liked, setLiked] = useState(false);

  const klikLike = () => {
    setLiked(!Liked);
  };

  const { data: thread, isLoading, isError } = UseThread();
  if (isLoading) return <div>Loading...</div>;
  if (isError || !thread) return <div>Gagal Mengambil thread</div>;
  console.log("thread list : ", thread);

  return (
    <>
      {thread.map((thread: any) => (
        <div
          key={thread.id}
          className="flex gap-4 p-3 border-b-2 border-gray-700"
        >
          <img src="./img/p1.jpg" alt="" className="w-12 h-12 rounded-4xl" />
          <div>
            <div className="flex items-center gap-2">
              <p>{thread.author.profile?.[0]?.name}</p>
              <p className="text-sm text-gray-400">@{thread.author.username}</p>
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
                <img src={thread.img} alt="" className="w-80 rounded-2xl" />
              </NavLink>
            </div>
            {/* likes and comments */}
            <div className="flex gap-3 pt-2">
              {/* likes */}
              <div className="flex items-center cursor-pointer hover:text-red-400">
                <Button
                  variant={null}
                  onClick={klikLike}
                  className="w-0 h-0 cursor-pointer hover:text-red-400"
                >
                  <FaRegHeart
                    className={`${
                      Liked ? "text-red-600" : "text-white"
                    } text-red-400`}
                  />
                </Button>
                <p>34</p>
              </div>
              {/* commens */}
              <div className="flex items-center cursor-pointer ">
                <Button variant={null} className="w-0 h-0">
                  <MdOutlineInsertComment />
                </Button>
                <p>13</p>
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
  console.log("watu post : ", postDate);

  const nowTime = now.getDate();
  console.log("waktu sekarang : ", nowTime);

  const SelisihDalamDetik = Math.floor((now.getTime() - postDate) / 10000);
  console.log("selisih dalam detik : ", SelisihDalamDetik);

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
