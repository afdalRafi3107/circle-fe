// import { useEffect, useState } from "react";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdOutlineInsertComment } from "react-icons/md";
import { UseThread } from "@/hooks/use-thread";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { UseProfile } from "@/hooks/use-profile";
import { ButtonDeleteThread } from "../featureButton/DeleteButtonThread";
import { getRelatifTime } from "@/utils/time";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaEllipsisV } from "react-icons/fa";
import { LikeButton } from "../featureButton/like";
import { Skeleton } from "@/components/ui/skeleton";

export function ThreadList() {
  const { data: thread, isLoading, isError } = UseThread();
  const { data: user } = UseProfile();

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }
  if (isError || !thread) return <div>Gagal Mengambil thread</div>;

  return (
    <>
      {thread.map((thread: any) => (
        <div className="w-full flex gap-4 col-end-2 p-3 border-b border-gray-700">
          <img
            src={
              thread.author.profile?.[0]?.photoProfile
                ? `${thread.author.profile?.[0].photoProfile}`
                : "/defaultIMG/defaultP.jpg"
            }
            alt=""
            className="w-8 h-8 rounded-4xl sm:w-10 sm:h-10 md:w-12 md:h-12"
          />
          <div className="w-full">
            <div className="flex w-full items-center gap-2 justify-between">
              <div className="name w-fit flex items-center gap-2">
                <NavLink
                  to={
                    user?.id == thread.authorID
                      ? `/profile`
                      : `/user-profile/${thread.authorID}`
                  }
                  className="hover:underline"
                >
                  <p className="text-sm sm:text-sm">
                    {thread.author.profile?.[0]?.name}
                  </p>
                </NavLink>
                <NavLink to={`/user-profile/${thread.author?.id}`}>
                  <p className="text-sm text-gray-400 sm:text-xs">
                    @{thread.author.username}
                  </p>
                </NavLink>
                <p className="text-sm text-gray-400 sm:text-xs">•</p>
                <p className="text-sm text-gray-400 sm:text-xs">
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
            <div className="flex flex-col gap-2  w-full">
              <NavLink to={`/detail-thread/${thread.id}`}>
                <p className="text-sm text-gray-200 text-justify sm:text-xs">
                  {thread.content}
                </p>
                <img
                  src={`${thread.img}`}
                  alt=""
                  className="w-50 rounded-2xl sm:w-80 sm:rounded-xl mt-2"
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
