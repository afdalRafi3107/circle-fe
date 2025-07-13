import { MdOutlineInsertComment } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { usePostByUser } from "@/hooks/use-postByUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavLink } from "react-router-dom";
import { ButtonDeleteThread } from "../featureButton/DeleteButtonThread";
import { FaEllipsisV } from "react-icons/fa";
import { LikeButton } from "../featureButton/like";
import { getRelatifTime } from "@/utils/time";

export function PostListByUser() {
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
          className="w-full flex gap-4 p-3 border-b border-gray-700"
        >
          <img
            src={
              post.author?.profile?.[0].photoProfile
                ? `${post.author?.profile?.[0].photoProfile}`
                : "../defaultIMG/defaultP.jpg"
            }
            alt=""
            className="w-12 h-12 rounded-4xl"
          />
          <div className=" w-full">
            <div className="flex items-center gap-2 justify-between ">
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
              <div className="dropdown">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <FaEllipsisV
                      size={12}
                      className="text-white cursor-pointer hover:text-gray-400"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-900">
                    <DropdownMenuItem className="w-full hover:bg-gray-800">
                      <a href="#" className="text-white">
                        Update
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="w-full hover:bg-gray-800">
                      <ButtonDeleteThread id={post.id} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex flex-col gap-2 pr-5  w-full">
              <NavLink to={`/detail-thread/${post.id}`}>
                <p className="text-sm text-gray-200 text-justify">
                  {post.content}
                </p>
                <img src={`${post.img}`} alt="" className="w-80 rounded-2xl" />
              </NavLink>
            </div>
            {/* likes and comments */}
            <div className="flex gap-3 pt-2">
              {/* likes */}
              <div className="flex items-center cursor-pointer hover:text-red-400">
                <LikeButton idThread={post.id} likeCount={post._count?.like} />
              </div>
              {/* commens */}
              <div className="flex items-center cursor-pointer ">
                <Button variant={null} className="w-0 h-0">
                  <MdOutlineInsertComment />
                </Button>
                <p>{post._count?.reply}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
