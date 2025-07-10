import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FaEllipsisV } from "react-icons/fa";
import { ButtonDeleteReply } from "./DeleteButtonReply";
import { ButtonDeleteThread } from "./DeleteButtonThread";
import { EditPostDialog } from "./editTrhread";

interface Props {
  id: number;
  content: string;
  img: string | null;
}

export function DropdownThreads({ id, content, img }: Props) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <FaEllipsisV
            size={12}
            className="text-white cursor-pointer hover:text-gray-400"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="sm:max-w-[425px] p-3 bg-gray-200">
          <DropdownMenuItem
            onClick={() => {
              setTimeout(() => {
                setIsEditOpen(true);
              }, 50);
            }}
            className="cursor-pointer"
          >
            Edit Thread
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setTimeout(() => {
                setIsDelete(true);
              }, 50);
            }}
            className="cursor-pointer"
          >
            <ButtonDeleteThread id={id} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditPostDialog
        // onOpen={isEditOpen}
        postId={id}
        currentContent={content}
        currentImg={img}
      />
    </div>
  );
}
