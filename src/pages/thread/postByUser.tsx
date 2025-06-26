import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdOutlineInsertComment } from "react-icons/md";
import { UseThread } from "@/hooks/use-thread";
import { Button } from "@/components/ui/button";
import { usePostByUser } from "@/hooks/use-postByUser";
import { apiUpload } from "@/utils/urlimg";

export function PostListByUser() {
  const [Liked, setLiked] = useState(false);

  const klikLike = () => {
    setLiked(!Liked);
  };

  const { data: post, isLoading, isError } = usePostByUser();
  console.log("data post:", post);
  if (isLoading) return <div>Loading...</div>;
  if (isError || !post) return <div>Gagal Mengambil thread</div>;
  console.log("thread list : ", post);

  return (
    <>
      {post.map((post: any) => (
        <div
          key={post.id}
          className="flex gap-4 p-3 border-b-2 border-gray-700"
        >
          <img
            src={
              post.author?.profile?.[0].photoProfile
                ? `${apiUpload}${post.author?.profile?.[0].photoProfile}`
                : "../defaultIMG/defaultP.jpg"
            }
            alt=""
            className="w-12 h-12 rounded-4xl"
          />
          <div>
            <div className="flex items-center gap-2">
              <p>{post.author?.profile?.[0].name || "Unknown"}</p>
              <p className="text-sm text-gray-400">
                @{post.author?.username || "Unknown"}
              </p>
              <p className="text-sm text-gray-400">•</p>
              <p className="text-sm text-gray-400">
                {getRelatifTime(new Date(post.createAt))}
              </p>
            </div>
            <div className="flex flex-col gap-2 pr-5  w-240">
              <p className="text-sm text-gray-200 text-justify">
                {post.content}
              </p>
              <img
                src={`${apiUpload}${post.img}`}
                alt=""
                className="w-80 rounded-2xl"
              />
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
  const selisihDetik = Math.floor((now.getTime() - postDate) / 1000);

  if (selisihDetik < 60) {
    return `${selisihDetik}s ago`;
  }

  const selisihMenit = Math.floor(selisihDetik / 60);
  if (selisihMenit < 60) {
    return `${selisihMenit}m ago`;
  }

  const selisihJam = Math.floor(selisihMenit / 60);
  if (selisihJam < 24) {
    return `${selisihJam}h ago`;
  }

  const selisihHari = Math.floor(selisihJam / 24);
  return `${selisihHari}d ago`;
}
