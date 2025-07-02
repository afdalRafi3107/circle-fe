import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useFollowres } from "@/hooks/use-followers";
import { apiUpload } from "@/utils/urlimg";
import { FollowButton } from "./buttonFollow.tsx/follow";
import { useFollowing } from "@/hooks/use-folowing";

function Follows() {
  const { data: followers, isLoading, isError } = useFollowres();
  const { data: following } = useFollowing();

  console.log("followres detail: ", following);

  const [follow, unfollow] = useState(true);
  const klikButton = () => {
    unfollow(!follow);
  };

  const [activeTab, setActiveTab] = useState("AllPost");
  if (isLoading) return <div>Loading...</div>;
  if (isError || !followers) return <div>Gagal Mengambil thread</div>;
  return (
    <main className="h-screen border-l border-gray-500 p-5">
      {/* Post and media */}
      <div className="Tabs">
        <Tabs
          defaultValue="followers"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="flex justify-between text-white w-full border-b p-0 border-gray-700 rounded-none text-white">
            <div className="w-full text-center">
              <TabsTrigger
                className=" w-full text-1sm border-0 rounded-none cursor-pointer data-[state=active]:border-b-4 border-solid border-green-600"
                value="followers"
              >
                Followers
              </TabsTrigger>
            </div>
            <div className="w-full text-center ">
              <TabsTrigger
                className="w-full text-1sm text-white border-0 rounded-none cursor-pointer bg-black border-0 data-[state=active]:border-b-4 border-solid border-green-600 bg-black"
                value="following"
              >
                Following
              </TabsTrigger>
            </div>
          </TabsList>
          <TabsContent value="followers" className="">
            {/* Followers */}
            {followers.map((data: any) => (
              <div className="flex flex-col pb-2 ">
                {/* User Followers */}
                <div className="UserSugested flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        data?.follower?.profile?.[0]?.photoProfile
                          ? `${apiUpload}${data?.follower?.profile?.[0]?.photoProfile}`
                          : "/defaultIMG/defaultP.jpg"
                      }
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="text-white">
                      <p className="text-sm font-semibold">
                        {data?.follower?.profile[0]?.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        @{data?.follower?.username}
                      </p>
                    </div>
                  </div>
                  <FollowButton userId={data.follower?.profile?.[0].id} />
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="following" className="">
            {/* Following */}
            {following?.follow?.map((followItem: any) => (
              <div className="flex flex-col gap-4">
                {/* User Following */}
                <div className="UserSugested flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        followItem.following.profile[0]?.photoProfile
                          ? `${apiUpload}${followItem.following.profile[0]?.photoProfile}`
                          : "/defaultIMG/defaultP.jpg"
                      }
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="text-white">
                      <p className="text-sm font-semibold">
                        {followItem.following.profile[0]?.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        @{followItem.following.username}
                      </p>
                    </div>
                  </div>
                  <FollowButton userId={followItem.following.profile[0]?.id} />
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default Follows;
