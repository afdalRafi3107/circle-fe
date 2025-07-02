import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import api from "@/api/axios";

// import { useQuery } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sgstflow } from "@/model/Dummyfollowers";
import { UseProfile } from "@/hooks/use-profile";
// const fecthUser = async () => {
//   const res = await api.get("/");
//   return res.data.user;
// };

import { useEdtProfile } from "@/hooks/use-EditProfile";
import { useForm } from "react-hook-form";
import type { editProfileDTO } from "@/schema/editProfileSchemas";
import { editProfileSchema } from "@/schema/editProfileSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiUpload } from "@/utils/urlimg";
import { useSugestFollow } from "@/hooks/use-sugestFollow";
import { FollowButton } from "@/pages/buttonFollow.tsx/follow";

export function RightBar() {
  const [img, setImg] = useState<string | null>(null);

  const { data: user, isLoading, isError } = UseProfile();
  const { data: SugetsFollow } = useSugestFollow("cek aahh");
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

  if (isLoading) return <div>Loading...</div>;
  if (isError || !user) return <div>Gagal mengambil profil</div>;

  return (
    <>
      <div className="flex flex-col w-1/4 p-3 gap-3 ">
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
                  <p className="font-bold">54</p>
                  <p className="text-gray-300">Following</p>
                </div>
                <div className="flex gap-1.5">
                  <p className="font-bold ">1023</p>
                  <p className="text-gray-300">Followers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* follow sugest */}
        <div className="flex flex-col gap-3 h-fit bg-gray-950 text-white p-3 rounded-2xl">
          <p className="text-xl font-bold">Suggested for you</p>
          {SugetsFollow ? (
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

  const onSubmit = async (data: editProfileDTO) => {
    mutateEditProfile(data);
    console.log(data);
  };
  const { data: user } = UseProfile();
  const { register, handleSubmit } = useForm<editProfileDTO>({
    defaultValues: {
      name: `${user.profile[0].name}`,
      bio: `${user.profile[0].bio}`,
      username: `${user.username}`,
    },
    resolver: zodResolver(editProfileSchema),
  });
  return (
    <>
      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogTrigger className="border-3 font-bold w-22  h-10 rounded-2xl text-sm cursor-pointer ">
          Edit Profile
        </DialogTrigger>
        <DialogContent className="flex flex-col bg-gray-800 border-0 text-white pt-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* change Profile */}
            <div className="flex flex-col">
              <div>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <img
                    src="./img/bg.jpg"
                    alt=""
                    className="h-25 w-full object-cover rounded-2xl"
                  />
                </label>
                <Input id="file-upload" type="file" className="sr-only" />
              </div>
              <div className="bg-amber-100 w-fit rounded-[20mm] ml-6 -mt-10 border-5 border-gray-500">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <img
                    src="./img/profile.jpg"
                    alt=""
                    className="h-18 object-cover rounded-[20mm]"
                  />
                </label>
                <Input id="file-upload" type="file" className="sr-only" />
              </div>
            </div>
            {/* inputan  */}
            <div key={user.id}>
              <label htmlFor="Name">name</label>
              <Input {...register("name")} />
              <label htmlFor="bio">Username</label>
              <Input {...register("username")} id="bio" type="text" />
              <label>Bio</label>
              <Textarea {...register("bio")} />
            </div>
            {/* button Image And Post */}
            <div className="flex justify-between">
              <Button
                type="submit"
                className=" bg-green-400 cursor-pointer hover:bg-green-500"
                onClick={() => setIsOpen(false)}
              >
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
