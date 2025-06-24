import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LuImagePlus } from "react-icons/lu";
export function dsatu() {
  return (
    <div className="text-white">
      {/* post input */}
      <div className="flex items-center gap-3">
        <img src="./img/p1.jpg" alt="" className="w-12 h-12 rounded-4xl" />
        <Input
          className="caret-green-400 border-0 h-12"
          placeholder="Ada apa hari ini?"
        />
        <div className="w-0 ">
          <label htmlFor="file-upload">
            <LuImagePlus
              size={30}
              className="mr-3 ml-3 text-green-600 hover:text-green-500"
              style={{ cursor: "pointer" }}
            />
          </label>
          <Input id="file-upload" type="file" className="sr-only" />
        </div>
        <Button className="bg-green-500 cursor-pointer hover:bg-green-600">
          Post
        </Button>
      </div>
    </div>
  );
}
