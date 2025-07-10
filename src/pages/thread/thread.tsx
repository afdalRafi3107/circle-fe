// import { useEffect, useState } from "react";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdOutlineInsertComment } from "react-icons/md";
import { UseThread } from "@/hooks/use-thread";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { apiUpload } from "@/utils/urlimg";
import { UseProfile } from "@/hooks/use-profile";
import { ButtonDeleteThread } from "../featureButton/DeleteButtonThread";
import { getRelatifTime } from "@/utils/time";
import { EditPostDialog } from "../featureButton/editTrhread";

import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuGroup,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuPortal,
  // DropdownMenuSeparator,
  // DropdownMenuShortcut,
  // DropdownMenuSub,
  // DropdownMenuSubContent,
  // DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaEllipsisV } from "react-icons/fa";
import { LikeButton } from "../featureButton/like";

export function ThreadList() {
  const { data: thread, isLoading, isError } = UseThread();
  const { data: user } = UseProfile();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !thread) return <div>Gagal Mengambil thread</div>;
  console.log("thread list : ", thread);
  console.log("user yang Login : ", user);

  return (
    <>
      {thread.map((thread: any) => (
        <div className="flex gap-4 p-3 border-b border-gray-700">
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
            <div className="flex items-center gap-2 justify-between">
              <div className="name flex items-center gap-2">
                <NavLink
                  to={
                    user?.id == thread.authorID
                      ? `/profile`
                      : `/user-profile/${thread.authorID}`
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
              <div className="dialog">
                {user?.id === thread.authorID ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <FaEllipsisV
                        size={12}
                        className="text-white cursor-pointer hover:text-gray-400"
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-900">
                      <DropdownMenuItem className="w-full hover:bg-gray-800">
                        <EditPostDialog
                          postId={thread.id}
                          currentContent={thread.content}
                          currentImg={thread.img}
                        />
                      </DropdownMenuItem>
                      <DropdownMenuItem className="w-full hover:bg-gray-800">
                        <ButtonDeleteThread id={thread.id} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : // <DropdownThreads
                //   id={thread.id}
                //   content={thread.content}
                //   img={thread.img}
                // />
                null}
              </div>
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
                <LikeButton
                  idThread={thread.id}
                  likeCount={thread._count.like}
                />
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
