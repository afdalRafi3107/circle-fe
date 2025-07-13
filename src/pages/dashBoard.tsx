import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ThreadList } from "./thread/thread";
import { UseProfile } from "@/hooks/use-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type createThreadDTO,
  createThreadSchemas,
} from "@/schema/createThreadSchemas";
import { useCreateThread } from "@/hooks/use-createThread";
import { useForm } from "react-hook-form";
import { LuImagePlus } from "react-icons/lu";

export function Home() {
  const { data: user, isLoading, isError } = UseProfile();
  const { mutateCreateThread } = useCreateThread();

  const { register, handleSubmit } = useForm<createThreadDTO>({
    resolver: zodResolver(createThreadSchemas),
  });

  const onsubmit = (data: createThreadDTO) => {
    mutateCreateThread(data);
    console.log("data yang masuk : ", data);
  };
  const handelImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
  };

  if (isLoading) {
    return <p className="text-white p-4">Loading...</p>;
  }

  if (isError || !user) {
    return <p className="text-red-500 p-4">Gagal mengambil data user</p>;
  }

  return (
    <ScrollArea className="h-screen w-full border-r border-gray-700 p-5">
      <div className=" text-white ">
        <p className="text-md sm:text-xl m-2 font-bold">Home</p>
        <form>
          <div className="flex items-center p-3 gap-2 border-b border-gray-700">
            <img
              src={
                user.profile?.[0]?.photoProfile
                  ? `${user.profile[0].photoProfile}`
                  : "../defaultIMG/defaultP.jpg"
              }
              alt=""
              className="w-8 h-8 sm:w-12 sm:h-12  rounded-full"
            />
            <Input
              {...register("content")}
              className="caret-green-400 border-0 h-12"
              placeholder="Ada apa hari ini?"
            />
            <div>
              <label htmlFor="file-upload">
                <LuImagePlus
                  size={25}
                  className="mr-3 ml-3 text-green-600 hover:text-green-500"
                  style={{ cursor: "pointer" }}
                />
              </label>
              <Input
                id="file-upload"
                type="file"
                accept="image/"
                onChange={handelImageChange}
                className="sr-only w-0"
              />
            </div>
            <Button
              className="bg-green-500 cursor-pointer hover:bg-green-600"
              onClick={handleSubmit(onsubmit)}
            >
              Post
            </Button>
          </div>
        </form>

        {/* postingan */}
        <ThreadList />
      </div>
    </ScrollArea>
  );
}
