import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ThreadList } from "./thread/thread";

export function Home() {
  return (
    <ScrollArea className="border-r-2 h-screen border-gray-700">
      <div className=" text-white ">
        <p className="text-2xl m-2 font-bold">Home</p>
        <div className="flex items-center p-3 gap-2 border-b-2 border-gray-700">
          <img src="./img/p1.jpg" alt="" className="w-12 h-12 rounded-4xl" />
          <Input
            className="caret-green-400 border-0 h-12"
            placeholder="Ada apa hari ini?"
          />
          {/* <div>
            <label htmlFor="file-upload">
              <LuImagePlus
                size={30}
                className="mr-3 ml-3 text-green-600 hover:text-green-500"
                style={{ cursor: "pointer" }}
              />
            </label>
            <Input id="file-upload" type="file" className="sr-only" />
          </div> */}
          <Button className="bg-green-500 cursor-pointer hover:bg-green-600">
            Post
          </Button>
        </div>

        {/* postingan */}
        <ThreadList />
      </div>
    </ScrollArea>
  );
}
