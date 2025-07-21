import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai"; //home Icon
import { FaRegUserCircle } from "react-icons/fa"; //icon Profile
import { BsSearchHeart } from "react-icons/bs"; //serach Icon
import { BsHeart } from "react-icons/bs"; //heard icon
import { Button } from "@/components/ui/button";
import { FaSignOutAlt } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { LuImagePlus } from "react-icons/lu";

import { useAuth } from "@/Auth/AuthContext/AuthContext";
import { useCreateThread } from "@/hooks/use-createThread";
import { useForm } from "react-hook-form";
import {
  type createThreadDTO,
  createThreadSchemas,
} from "@/schema/createThreadSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { useLocation } from "react-router-dom";

export const LeftBar = () => {
  const location = useLocation();
  const { logOut } = useAuth();
  const Navigate = useNavigate();
  const LogOut = () => {
    logOut();
    Navigate("/login");
  };

  return (
    <>
      <div className="hidden md:block flex flex-col gap-3 text-2xl text-white w-1/4 text-left h-screen p-5 border-r border-gray-700">
        <h1 className="text-green-400 text-3xl font-bold mb-2">CIRCLE</h1>
        <div className="flex flex-col gap-6 ">
          {/* Home */}
          <NavLink
            to="/"
            className="flex items-center gap-2 hover:text-green-400"
          >
            {location.pathname === "/" ? (
              <AiOutlineHome className="text-2xl text-green-400" />
            ) : (
              <AiOutlineHome className="text-2xl text-white" />
            )}
            <span
              className={
                location.pathname === "/" ? "text-green-400" : "text-white"
              }
            >
              Home
            </span>
          </NavLink>

          {/* Search */}
          <NavLink
            to="/search"
            className="flex items-center gap-2 hover:text-green-400"
          >
            {location.pathname === "/search" ? (
              <BsSearchHeart className="text-2xl text-green-400" />
            ) : (
              <BsSearchHeart className="text-2xl text-white" />
            )}
            <p
              className={
                location.pathname === "/search"
                  ? "text-green-400"
                  : "text-white"
              }
            >
              Search
            </p>
          </NavLink>

          {/* Follows */}
          <NavLink
            to="/follows"
            className="flex items-center gap-2 hover:text-green-400"
          >
            {location.pathname === "/follows" ? (
              <BsHeart className="text-2xl text-green-400" />
            ) : (
              <BsHeart className="text-2xl text-white" />
            )}
            <p
              className={
                location.pathname === "/follows"
                  ? "text-green-400"
                  : "text-white"
              }
            >
              Follows
            </p>
          </NavLink>

          {/* profile */}
          <NavLink
            to="/profile"
            className="flex items-center gap-2 hover:text-green-400"
          >
            {location.pathname === "/profile" ? (
              <FaRegUserCircle className="text-2xl text-green-400" />
            ) : (
              <FaRegUserCircle className="text-2xl text-white" />
            )}
            <p
              className={
                location.pathname === "/profile"
                  ? "text-green-400"
                  : "text-white"
              }
            >
              Profile
            </p>
          </NavLink>

          <DialogPost />
        </div>
      </div>
      <div className="fixed bottom-5 left-5 flex items-center gap-2 text-sm cursor-pointer text-white hover:opacity-80">
        <Button
          variant={null}
          className="text-md cursor-pointer hover:text-green-400"
          onClick={LogOut}
        >
          <FaSignOutAlt className="w-8 h-8 hover:text-green-500" />
          LogOut
        </Button>
      </div>
    </>
  );
};

//dialog

function DialogPost() {
  const { mutateCreateThread } = useCreateThread();
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<createThreadDTO>({
    resolver: zodResolver(createThreadSchemas),
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("img", file);
    }
  };

  const onsubmit = (data: createThreadDTO) => {
    mutateCreateThread(data);
    setIsOpen(false);
    setPreview(null);
    console.log("data yang masuk : ", data);
  };
  const [preview, setPreview] = useState<string | null>(null);
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant={null}
            className="w-full bg-green-500 text-xl h-3xl hover:bg-green-400 cursor-pointer"
          >
            Create Post
          </Button>
        </DialogTrigger>
        <DialogContent className=" bg-gray-950 text-white border-0">
          <DialogHeader>
            <DialogTitle>Ceate Post</DialogTitle>
          </DialogHeader>
          <form encType="multipart/form-data" onSubmit={handleSubmit(onsubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Textarea
                  {...register("content")}
                  placeholder="What is happening..."
                />
                {errors.content && (
                  <p className="text-white">{errors.content.message}</p>
                )}
              </div>
              <div className="grid gap-3">
                <label htmlFor="file-upload">
                  <LuImagePlus
                    size={25}
                    onClick={handleImageClick}
                    className="mr-3 ml-3 text-green-600 hover:text-green-500"
                    style={{ cursor: "pointer" }}
                  />
                </label>

                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {preview && (
                  <div className="flex flex-col gap-2">
                    <img src={preview} alt="preview" className="w-32 mt-2" />
                    <Button
                      type="button"
                      className="bg-red-500 w-fit"
                      onClick={() => {
                        setPreview(null);
                        setValue("img", undefined); // reset file dari form
                      }}
                    >
                      Hapus Gambar
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="bg-green-500 cursor-pointer active:bg-green-400"
              >
                post
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
