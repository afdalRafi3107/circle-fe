import {
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  Dialog,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useEditThread } from "@/hooks/use-editThread";
import {
  editThreadSchmeas,
  type editThreadSchmeasDTO,
} from "@/schema/editThreadSchemas";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

type updateaThreadProps = {
  postId: number;
  currentContent: string;
  currentImg?: string | null;
  //   onOpen: (open: boolean) => void;
};
export function EditPostDialog({
  postId,
  currentContent,
  currentImg,
//   onOpen,
}: updateaThreadProps) {
  const [preview, setPreview] = useState(currentImg ? currentImg : null);
  const [removeImg, setRemoveImg] = useState(false);
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, setValue, watch } =
    useForm<editThreadSchmeasDTO>({
      resolver: zodResolver(editThreadSchmeas),
      defaultValues: {
        content: currentContent,
      },
    });

  const { mutateAsync: mutateEditThread, isPending } = useEditThread(postId);

  const onSubmit = async (data: editThreadSchmeasDTO) => {
    await mutateEditThread({ ...data, removeImg });
    setOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("img", file);
      setPreview(URL.createObjectURL(file));
      setRemoveImg(false);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setValue("img", undefined);
    setRemoveImg(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          type="button"
          className=" p-0 text-white font-normal"
        >
          Edit Post
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 text-white p-6 space-y-4">
        <DialogTitle>Update Thread</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <label>Content</label>
          <Textarea {...register("content")} className="text-black" />

          <label>Image</label>
          <Input type="file" accept="image/*" onChange={handleImageChange} />

          {preview && (
            <div>
              <img
                src={preview}
                alt="Preview"
                className="w-40 rounded mt-2 object-cover"
              />
              <Button
                type="button"
                className="bg-red-500 mt-2"
                onClick={handleRemoveImage}
              >
                Hapus Gambar
              </Button>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
