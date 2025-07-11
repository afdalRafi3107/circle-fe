import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UseProfile } from "@/hooks/use-profile";
import { DialogEditProfile } from "@/layout/sidebars/rightBar";
import { PostListByUser } from "../thread/postByUser";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Media } from "../thread/media";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { data: user, isLoading, isError } = UseProfile();
  // const { data: folow } = useSugestFollow();
  // console.log(folow);
  const Navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !user) return <div>Gagal mengambil profil</div>;

  return (
    <>
      <ScrollArea className="flex flex-col gap-6 w-full p-2 text-white border-r  border-gray-600 h-screen">
        <div className="  ">
          {/* comback button */}

          <div className="flex gap-3 items-center mb-2">
            <Button
              onClick={() => Navigate(-1)}
              className="cursor-pointer hover:text-gray-400  "
            >
              <FaArrowLeft />
            </Button>
            <p className="font-semibold">{user.profile[0].name}</p>
          </div>
          {/* profile detail */}
          <div className="p-2">
            {/* pp and banner */}
            <div className="flex- flex-col gap-10">
              <img
                src={
                  user.profile[0].banner
                    ? `${user.profile[0].banner}`
                    : "/defaultIMG/defaultB.jpg"
                }
                alt=""
                className="h-35 w-full object-cover cursor-pointer rounded-2xl"
              />
              <div className="flex items-center justify-between">
                <img
                  src={
                    user.profile[0].photoProfile
                      ? `${user.profile[0].photoProfile}`
                      : "/defaultIMG/defaultP.jpg"
                  }
                  alt=""
                  className="w-25 h-25 object-cover rounded-[20mm] ml-5 border-4 border-gray-950 -mt-15 "
                />
                {/* dialog edit Profile */}
                <div className="mt-5">
                  <DialogEditProfile />
                </div>
              </div>
            </div>
          </div>
          {/* profile */}
          <div className="flex flex-col gap-2.5 pb-3">
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
          {/* tabs AllPost and Media  */}
          <div className="w-full">
            <Tabs
              defaultValue="allpost"
              className="w-ful bg-none rounded-none text-white"
            >
              <TabsList className="w-full border-b-2 p-0 border-gray-700 rounded-none text-white bg-none">
                <TabsTrigger
                  value="allpost"
                  className="w-1/2 border-0 text-1sm rounded-none cursor-pointer bg-black text-white data-[state=active]:border-b-4 border-solid border-green-500"
                >
                  AllPost
                </TabsTrigger>
                <TabsTrigger
                  value="media"
                  className="w-1/2 border-0 text-1sm rounded-none cursor-pointer data-[state=active]:border-b-4 border-solid border-green-500"
                >
                  Media
                </TabsTrigger>
              </TabsList>
              <TabsContent value="allpost">
                <PostListByUser />
              </TabsContent>
              <TabsContent value="media">
                <Media />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </ScrollArea>
    </>
  );
}

export default Profile;
