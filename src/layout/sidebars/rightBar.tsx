import { Button } from "@/components/ui/button";
import React, { use, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import api from "@/api/axios";

// import { useQuery } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseProfile } from "@/hooks/use-profile";
// const fecthUser = async () => {
//   const res = await api.get("/");
//   return res.data.user;
// };

import { IoMdCloseCircle } from "react-icons/io";

import { useEdtProfile } from "@/hooks/use-EditProfile";
import { useForm } from "react-hook-form";
import type { editProfileDTO } from "@/schema/editProfileSchemas";
import { editProfileSchema } from "@/schema/editProfileSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiUpload } from "@/utils/urlimg";
import { useSugestFollow } from "@/hooks/use-sugestFollow";
import { FollowButton } from "@/pages/featureButton/follow";
import { useLocation } from "react-router-dom";

export function RightBar() {
  const [img, setImg] = useState<string | null>(null);

  const { data: user, isLoading, isError } = UseProfile();
  const { data: SugetsFollow } = useSugestFollow();
  console.log("sugestFollow :ss ", SugetsFollow);

  useEffect(() => {
    const banner = user?.profile?.[0]?.banner;
    const imgProfile = banner
      ? `${apiUpload}${banner}`
      : "/defaultIMG/defaultB.jpg";
    setImg(imgProfile);
  }, [user]);
  // const { data: user, isLoading } = useQuery({
  //   queryKey: ["user"],
  //   queryFn: fecthUser,
  // });
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !user) return <div>Gagal mengambil profil</div>;

  return (
    <>
      <div className="flex flex-col w-1/4 p-3 gap-3 ">
        {location.pathname === "/profile" ? null : (
          <div className="flex flex-col gap-3 h-fit bg-gray-950 text-white p-3 rounded-2xl">
            <p className="text-xl font-bold">My Profile</p>
            <div className="flex flex-col gap-3">
              <img
                src={img ?? "/defaultIMG/defaultB.jpg"}
                alt="banner"
                className="h-25 w-full object-cover cursor-pointer rounded-2xl"
              />
              <div className="flex items-center justify-between">
                <img
                  src={
                    user.profile[0].photoProfile
                      ? `${apiUpload}${user.profile[0].photoProfile}`
                      : "/defaultIMG/defaultP.jpg"
                  }
                  alt="Profile iamge"
                  className="w-20 h-20 object-cover rounded-[200mm] ml-5 border-4 border-gray-950 -mt-15 "
                />
                <DialogEditProfile />
              </div>
              {/* profile */}
              <div className="flex flex-col gap-2.5">
                <p className="font-bold text-xl">{user.profile[0].name}</p>
                <p className="text-sm text-gray-300">@{user.username}</p>
                <p className="text-md">{user.profile[0].bio}</p>
                {/* follwing/followers */}
                <div className="flex gap-4 text-sm">
                  <div className="flex gap-1.5">
                    <p className="font-bold">{user._count.follow}</p>
                    <p className="text-gray-300">Following</p>
                  </div>
                  <div className="flex gap-1.5">
                    <p className="font-bold ">{user._count.followers}</p>
                    <p className="text-gray-300">Followers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* follow sugest */}
        <div className="flex flex-col gap-3 h-fit bg-gray-950 text-white p-3 rounded-2xl">
          <p className="text-xl font-bold">Suggested for you</p>
          {SugetsFollow?.length > 0 ? (
            SugetsFollow.map((follow: any) => (
              <div>
                <div key={follow.id} className="flex gap-2 items-center">
                  <img
                    src={
                      follow.photoProfile
                        ? `${follow.photoProfile}`
                        : "/defaultIMG/defaultP.jpg"
                    }
                    alt=""
                    className="w-12 h-12 rounded-4xl"
                  />
                  <div className="flex justify-between  items-center w-full">
                    <div className="text-sm">
                      <p className="font-bold">{follow.name}</p>
                      <p className="text-gray-300">
                        @{follow.userProfile?.username}
                      </p>
                    </div>
                    {/* <Button>follow</Button> */}
                    <FollowButton userId={follow.userProfile?.id} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">No suggestions found</p>
          )}
        </div>
      </div>
    </>
  );
}

export function DialogEditProfile() {
  const { mutateEditProfile } = useEdtProfile();

  const [open, setIsOpen] = useState(false);

  const { data: user } = UseProfile();

  const [previewPhotoProfile, setPreviewPhotoProfile] = useState<String | null>(
    user?.photoProfile
  );
  const [previewBanner, setPreviewBanner] = useState<String | null>(
    user?.banner
  );

  const { register, handleSubmit, setValue } = useForm<editProfileDTO>({
    defaultValues: {
      name: `${user.profile[0].name}`,
      bio: `${user.profile[0].bio}`,
      username: `${user.username}`,
    },
    resolver: zodResolver(editProfileSchema),
  });

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "photoProfile" | "banner"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(type, file);
      if (type === "photoProfile") {
        setPreviewPhotoProfile(URL.createObjectURL(file));
      } else {
        setPreviewBanner(URL.createObjectURL(file));
      }
    }
  };

  const handleRemoveImage = (type: "photoProfile" | "banner") => {
    setValue(type, undefined);
    if (type === "photoProfile") setPreviewPhotoProfile(null);
    else setPreviewBanner(null);
  };
  const onSubmit = async (data: editProfileDTO) => {
    mutateEditProfile(data);
    console.log("data yang inign di ubah sudah masuk : ", data);
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogTrigger className="border-3 font-bold w-22  h-10 rounded-2xl text-sm cursor-pointer ">
          Edit Profile
        </DialogTrigger>
        <DialogContent className="flex flex-col bg-gray-950 border-0 text-white pt-8">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* change banner */}
            <div className="flex flex-col">
              <div className=" h-32 w-full text-left">
                <label htmlFor="file-upload-banner" className="cursor-pointer">
                  {previewBanner ? (
                    <img
                      src={
                        typeof previewBanner === "string"
                          ? previewBanner
                          : "/defaultIMG/defaultB.jpg"
                      }
                      alt=""
                      className="h-32 w-full object-cover rounded-2xl p-0"
                    />
                  ) : (
                    <img
                      className="h-32 w-full object-cover rounded-xl flex items-center justify-center"
                      src={`${apiUpload}${user.profile[0].banner}`}
                      alt=""
                    />
                  )}
                </label>

                <Input
                  id="file-upload-banner"
                  type="file"
                  accept="image/"
                  className="sr-only"
                  onChange={(e) => handleImageChange(e, "banner")}
                />
                {previewBanner && (
                  <Button
                    type="button"
                    className="text-gray-500 p-0 ml-[90%] r-0 cursor-pointer"
                    onClick={() => handleRemoveImage("banner")}
                  >
                    <IoMdCloseCircle />
                    {/* delete banner */}
                  </Button>
                )}
              </div>
              {/* change profile */}
              <div className="flex flex-col text-right">
                <div className=" h-fit w-fit rounded-[20mm] ml-6 -mt-10 border-5 border-gray-950">
                  <label
                    htmlFor="file-upload-profile"
                    className="cursor-pointer h-24 w-24"
                  >
                    {previewPhotoProfile ? (
                      <img
                        src={
                          typeof previewPhotoProfile === "string"
                            ? previewPhotoProfile
                            : "/defaultIMG/defaultP.jpg"
                        }
                        alt=""
                        className="h-24 w-24 object-cover rounded-full p-0"
                      />
                    ) : (
                      <img
                        className="h-24 w-24 bg-gray-500 rounded-full flex items-center justify-center object-cover p-0"
                        src={`${apiUpload}${user.profile[0].photoProfile}`}
                        alt=""
                      />
                    )}
                  </label>
                  <Input
                    id="file-upload-profile"
                    type="file"
                    accept="image/"
                    className="sr-only"
                    onChange={(e) => handleImageChange(e, "photoProfile")}
                  />
                </div>
                {previewPhotoProfile && (
                  <Button
                    type="button"
                    className="text-gray-500 p-0 w-0 -mt-2 h-2"
                    onClick={() => handleRemoveImage("photoProfile")}
                  >
                    <IoMdCloseCircle />
                    {/* delete proflie */}
                  </Button>
                )}
              </div>
            </div>
            {/* inputan  */}
            <div key={user.id} className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="name-1">Name</label>
                <Input {...register("name")} />
                <label htmlFor="bio">Username</label>
                <Input {...register("username")} id="bio" type="text" />
                <label>Bio</label>
                <Textarea {...register("bio")} />
                <Button
                  type="submit"
                  className=" bg-green-400 cursor-pointer mt-3 hover:bg-green-500"
                  onClick={() => setIsOpen(false)}
                >
                  Save
                </Button>
              </div>
            </div>
            {/* button Image And Post */}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
