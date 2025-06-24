import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function Follows() {
  const [follow, unfollow] = useState(true);
  const klikButton = () => {
    unfollow(!follow);
  };

  const [activeTab, setActiveTab] = useState("AllPost");
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
            <div className="flex flex-col gap-4">
              {/* User Followers */}
              <div className="UserSugested flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img
                    src="./img/p1.jpg"
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="text-white">
                    <p className="text-sm font-semibold">Brand</p>
                    <p className="text-sm text-gray-400">@Brand</p>
                  </div>
                </div>
                <Button
                  onClick={klikButton}
                  className={`
                          h-8 rounded-2xl cursor-pointer bg-none border-2 hover:text-gray-400 text-amber-300 
                          ${
                            follow
                              ? "text-white"
                              : "text-gray-400 border-gray-400"
                          }
                        `}
                >
                  {follow ? "Follow" : "Unfollow"}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="following" className="">
            {/* Following */}
            <div className="flex flex-col gap-4">
              {/* User Following */}
              <div className="UserSugested flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img
                    src="/img/p2.jpg "
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="text-white">
                    <p className="text-sm font-semibold">Meydia</p>
                    <p className="text-sm text-gray-400">@Meydia</p>
                  </div>
                </div>
                <Button
                  onClick={klikButton}
                  className={`
                          h-8 rounded-2xl bg-black cursor-pointer border-2 hover:text-gray-400 text-amber-300 
                          ${
                            !follow
                              ? "text-white"
                              : "text-gray-400 border-gray-400"
                          }
                        `}
                >
                  {!follow ? "Follow" : "Unfollow"}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default Follows;
