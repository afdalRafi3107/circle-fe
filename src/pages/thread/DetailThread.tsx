import { Button } from "@/components/ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Input } from "@/components/ui/input";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { BiCommentDetail } from "react-icons/bi";

import { LuImagePlus } from "react-icons/lu";

import { apiUpload } from "@/utils/urlimg";

import {
  FaArrowLeft,
  FaHome,
  FaSearch,
  FaHeart,
  FaRegUser,
  FaUser,
  FaSignOutAlt,
  FaRegHeart,
  FaEllipsisV,
} from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useGetReplay } from "@/hooks/use-getReply";

import { useDetailThread } from "@/hooks/useDetailThread";
import { useReply } from "@/hooks/use-replythread";
import { useForm } from "react-hook-form";
import { type replyScemasDTO, replySchemas } from "@/schema/replySchema";
import { zodResolver } from "@hookform/resolvers/zod";

function DetailThread() {
  const { id } = useParams();
  const threadId = Number(id);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleIconClick = () => {
    setIsLiked(!isLiked);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // menggil semua reply
  const { data: reply } = useGetReplay(id || "");
  console.log("reply : ", reply);

  // get detail thread
  const { data: thread, isError, isLoading } = useDetailThread(id || "");
  // create Reply
  const { mutateReply, isPending } = useReply(id || "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<replyScemasDTO>({
    mode: "onChange",
    resolver: zodResolver(replySchemas),
  });

  const onsubmit = (data: replyScemasDTO) => {
    mutateReply(data);
  };

  if (isLoading) return <div>Loading....</div>;
  if (isError || !thread) return <div>Gagal memuat thread</div>;

  return (
    <main className="h-full border-gray-500">
      <ScrollArea className=" h-screen border-r-2 border-gray-600">
        {/*  */}
        <div className="flex items-center gap-1 p-3">
          <Button
            variant={null}
            className="p-0 text-white cursor-pointer hover:text-gray-400"
            onClick={handleGoBack}
          >
            <FaArrowLeft />
          </Button>
          <p className="text-xl text-white font-semibold">Thread</p>
        </div>

        {/* Main Status */}
        <div className="Post border-b border-gray-500">
          <div className="items flex gap-3 p-3 ">
            <div className="profile">
              <NavLink to="">
                <img
                  src={`${thread.author?.profil?.[0].img}`}
                  alt="profile"
                  className="w-12 h-11 rounded-full object-cover"
                />
              </NavLink>
            </div>
            <div className="Typograph w-full">
              <div className="TopTypoghsph flex justify-between pb-2">
                <div className="flex flex-col gap-0.5 items-center">
                  <NavLink
                    to=""
                    className="text-sm text-white font-semibold hover:underline"
                  >
                    {thread.author?.profile?.[0].name}
                  </NavLink>
                  <p className="text-xs text-gray-400">
                    @{thread.author?.username}
                  </p>
                </div>
                <div>
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
                        <Button className="p-0 text-white font-normal">
                          Delete
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <p className="text-gray-200 text-justify">{thread.content}</p>
              <Dialog>
                <DialogTrigger className="cursor-pointer">
                  <img
                    src={`${apiUpload}${thread.img}`}
                    alt=""
                    className="max-h-50 mt-2 rounded-2xl object-cover"
                  />
                </DialogTrigger>
                <DialogContent className="lg:min-w-200 bg-gray-900 p-8 text-gray-400 border-0 text-center">
                  <div className="">
                    <img
                      className="w-full rounded-2xl"
                      src={thread.img}
                      alt="gallery-photo"
                    />
                  </div>
                </DialogContent>
              </Dialog>

              {/* time post */}
              <div className="flex gap-2 items-center mt-2">
                <p className="text-sm text-gray-400">10:43 PM</p>
                <p className="text-2sm text-gray-400">•</p>
                <p className="text-sm text-gray-400">Maret 30, 2025</p>
              </div>
              {/* Action */}
              <div className="mt-3 ml-2 flex gap-15 ">
                {/* Like */}
                <div className="flex items-center gap-1">
                  <Button
                    onClick={handleIconClick}
                    className="p-0 w-0 h-auto cursor-pointer bg-none text-gray-400 hover:text-red-400"
                  >
                    {isLiked ? (
                      <FaHeart
                        size={15}
                        className="text-red-700 duration-1000 "
                      />
                    ) : (
                      <FaRegHeart size={15} className="" />
                    )}
                    <span className=" text-xs">120</span>
                  </Button>
                </div>

                {/* Commment */}
                <div className="flex items-center gap-1">
                  <Button className="p-0 h-auto w-0 border-0 cursor-pointer bg-none text-gray-400 hover:text-green-400">
                    <BiCommentDetail size={15} />
                    <span className=" text-xs">12 Replies</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Post Form */}
        <div className="border-b border-gray-500">
          {/* Post content */}
          <div className="p-4 w-full items-start">
            <div className="w-full text-center flex items-center">
              <div className="profile">
                <NavLink to="">
                  <img
                    src="/image/profile/wp.jpg"
                    alt="profile"
                    className="w-12 h-11 rounded-full object-cover"
                  />
                </NavLink>
              </div>
              <form
                onSubmit={handleSubmit(onsubmit)}
                action=""
                className="flex items-center w-full"
              >
                <Input
                  {...register("comment")}
                  className="w-full ml-2 border-0 shadow-none text-gray-300 text-10xl font-medium"
                  placeholder="Type Your Reply!"
                />
                {/* <div>
                  <label htmlFor="file-upload">
                    <LuImagePlus
                      size={25}
                      className="mr-3 ml-3 text-green-600 hover:text-green-500"
                      style={{ cursor: "pointer" }}
                    />
                  </label>
                  <Input id="file-upload" type="file" className="sr-only" />
                </div> */}
                <Button
                  className="w-2md bg-green-600 text-white font-bold text-sm rounded-4xl hover:bg-green-500"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Post
                </Button>
              </form>
            </div>
          </div>
        </div>
        {/* /Post Form */}

        {/* Reply Users */}
        {reply.map(() => (
          <div className="Post border-b border-gray-500">
            <div className="items flex gap-3 p-4 ">
              <div className="profile">
                <NavLink to="">
                  <img
                    src={`${apiUpload}${reply.author?.profile?.[0].img}`}
                    alt="profile"
                    className="w-12 h-11 rounded-full object-cover"
                  />
                </NavLink>
              </div>
              <div className="Typograph w-full">
                <div className="TopTypoghsph flex justify-between">
                  <div className="flex gap-2 items-center">
                    <NavLink
                      to=""
                      className="text-sm text-white font-semibold hover:underline"
                    >
                      {reply.author?.profile?.[0].name}
                    </NavLink>
                    <p className="text-sm text-gray-400">
                      {reply.author?.username}
                    </p>
                    <p className="text-2sm text-gray-400">•</p>
                    <p className="text-sm text-gray-400">4h</p>
                  </div>
                  <div>
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
                          <Button className=" p-0 text-white font-normal">
                            Delete
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <p className="text-gray-200 text-sm text-justify">
                  {reply.comment}
                </p>
                <img
                  src=""
                  alt=""
                  className="max-h-60 mt-2 rounded-2xl object-cover"
                />

                {/* Action */}
                <div className="mt-3 flex gap-5">
                  {/* Like */}
                  <div className="flex items-center gap-1">
                    <Button
                      onClick={handleIconClick}
                      className="p-0 w-0 h-auto cursor-pointer bg-none text-gray-400 hover:text-red-400"
                    >
                      {isLiked ? (
                        <FaHeart
                          size={15}
                          className="text-red-700 duration-1000 "
                        />
                      ) : (
                        <FaRegHeart size={15} className="" />
                      )}
                      <span className=" text-xs">120</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </main>
  );
}

export default DetailThread;
