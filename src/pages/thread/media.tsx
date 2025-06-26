import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useMediaByUser } from "@/hooks/use-mediaByUser copy";
import { apiUpload } from "@/utils/urlimg";

export function Media() {

  const { data: media, isLoading, isError } = useMediaByUser();
  if (isLoading) return <div>Loading...</div>;
  if (isError || !media) return <div>Gagal Mengambil media</div>;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 p-2">
      {media.map((media: any) => (
        <Dialog>
          <DialogTrigger>
            <div key={media.id}>
              <img
                className="h-40 w-80 max-w-full rounded-lg object-cover object-center cursor-pointer hover:bg-transparent"
                src={`${apiUpload}${media.img}`}
                alt="gallery-photo"
              />
            </div>
          </DialogTrigger>
          <DialogContent className="fixed  border-0 w-400 items-center justify-center p-4">
            <div key={media.id} className="w-full">
              <img
                className="max-w-screen-lg max-h-screen-lg object-contain rounded-md shadow-lg"
                src={`${apiUpload}${media.img}`}
                alt="gallery-photo"
              />
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
