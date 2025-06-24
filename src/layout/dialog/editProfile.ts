// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import {
//   Dialog,

// } from "@/components/ui/dialog";
// // import api from "@/api/axios";

// // import { useQuery } from "@tanstack/react-query";

// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Sgstflow } from "@/model/Dummyfollowers";
// import { UseProfile } from "@/hooks/use-profile";
// // const fecthUser = async () => {
// //   const res = await api.get("/");
// //   return res.data.user;
// // };

// import { useEdtProfile } from "@/hooks/use-EditProfile";
// import { useForm } from "react-hook-form";
// import type { editProfileDTO } from "@/schema/editProfileSchemas";
// import { editProfileSchema } from "@/schema/editProfileSchemas";
// import { zodResolver } from "@hookform/resolvers/zod";
// function DialogEditProfile() {
//   const { mutateEditProfile, isPending } = useEdtProfile();

//   const [open, setIsOpen] = useState(false);

//   const onSubmit = async (data: editProfileDTO) => {
//     mutateEditProfile(data);
//     console.log(data);
//   };
//   const { data: user, isLoading, isError } = UseProfile();
//   const { register, handleSubmit } = useForm<editProfileDTO>({
//     defaultValues: {
//       name: `${user.profile[0].name}`,
//       bio: `${user.profile[0].bio}`,
//       username: `${user.username}`,
//     },
//     resolver: zodResolver(editProfileSchema),
//   });
//   return (
//     <>
//       <Dialog open={open} onOpenChange={setIsOpen}>
//         <DialogTrigger className="border-3 font-bold w-22  h-10 rounded-2xl text-sm cursor-pointer ">
//           Edit Profile
//         </DialogTrigger>
//         <DialogContent className="flex flex-col bg-gray-800 border-0 text-white pt-8">
//           <form onSubmit={handleSubmit(onSubmit)}>
//             {/* change Profile */}
//             <div className="flex flex-col">
//               <div>
//                 <label htmlFor="file-upload" className="cursor-pointer">
//                   <img
//                     src="./img/bg.jpg"
//                     alt=""
//                     className="h-25 w-full object-cover rounded-2xl"
//                   />
//                 </label>
//                 <Input id="file-upload" type="file" className="sr-only" />
//               </div>
//               <div className="bg-amber-100 w-fit rounded-[20mm] ml-6 -mt-10 border-5 border-gray-500">
//                 <label htmlFor="file-upload" className="cursor-pointer">
//                   <img
//                     src="./img/profile.jpg"
//                     alt=""
//                     className="h-18 h-18 object-cover rounded-[20mm]"
//                   />
//                 </label>
//                 <Input id="file-upload" type="file" className="sr-only" />
//               </div>
//             </div>
//             {/* inputan  */}
//             <div key={user.id}>
//               <label htmlFor="Name">name</label>
//               <Input {...register("name")} />
//               <label htmlFor="bio">Username</label>
//               <Input {...register("username")} id="bio" type="text" />
//               <label>Bio</label>
//               <Textarea {...register("bio")} />
//             </div>
//             {/* button Image And Post */}
//             <div className="flex justify-between">
//               <Button
//                 type="submit"
//                 className=" bg-green-400 cursor-pointer hover:bg-green-500"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Save
//               </Button>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }
