import { FaSearch } from "react-icons/fa";

import { useState } from "react";
import { useSearch } from "@/hooks/use-search";
import { apiUpload } from "@/utils/urlimg";
import { FollowButton } from "./featureButton/follow";
import { NavLink } from "react-router-dom";
import { UseProfile } from "@/hooks/use-profile";

function Search() {
  // pengkondisian tombol sudah follow atau tidak
  const [search, setSearch] = useState("");
  const { data: users, isLoading } = useSearch(search);
  const { data: loginedUser } = UseProfile();
  console.log("search : ", search);
  console.log("usesr yang ketemu : ", users);

  return (
    <main className="h-full border-r  border-gray-700 p-4">
      {/* input */}
      <div className="flex items-center rounded-full bg-gray-800 p-2 w-full">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search"
          value={search}
          className="bg-transparent text-white placeholder-gray-400 outline-none flex-grow"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {isLoading && <p>loading.....</p>}
      {/* sugest users */}
      <div className="SugestUSers pt-4 flex flex-col gap-4">
        {/* sugest peraccount */}
        {!users || users.length === 0 ? (
          <p className="text-white m-auto mt-20 font-semibold text-3xl">
            No Result
          </p>
        ) : (
          users?.map((user: any) => (
            <div
              key={user.id}
              className="UserSugested flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <img
                  src={
                    user.profile[0]?.photoProfile
                      ? `${apiUpload}${user.profile[0]?.photoProfile}`
                      : "/defaultIMG/defaultP.jpg"
                  }
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text-white">
                  <NavLink
                    className="hover:underline"
                    to={
                      user.id === loginedUser.id
                        ? `/profile`
                        : `/user-profile/${user.id}`
                    }
                  >
                    <p className="text-sm font-semibold">
                      {user.profile[0]?.name}
                    </p>
                  </NavLink>
                  <p className="text-sm text-gray-400">@{user.username}</p>
                </div>
              </div>
              <div className={user.id === loginedUser.id ? "hidden" : ""}>
                <FollowButton userId={user.id} />
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default Search;
