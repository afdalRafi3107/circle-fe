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
import { useMediaByProfile } from "@/hooks/use-MediabyUserProfile";
import { apiUpload } from "@/utils/urlimg";
import { useParams } from "react-router-dom";

export function MediaByUSerProfile() {
  const { id } = useParams();
  const { data: media, isLoading, isError } = useMediaByProfile(id || "");
  if (isLoading) return <div>Loading...</div>;
  if (isError || !media) return <div>Gagal Mengambil media</div>;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 p-2">
      {media.map((media: any) => (
        <Dialog>
          {media.img ? (
            <DialogTrigger>
              <div key={media.id}>
                <img
                  className="h-40 w-80 max-w-full rounded-lg object-cover object-center cursor-pointer hover:bg-transparent"
                  src={`${apiUpload}${media.img}`}
                  alt=""
                />
              </div>
            </DialogTrigger>
          ) : null}
          <DialogContent className="fixed  border-0 w-400 items-center justify-center p-4">
            <div key={media.id} className="w-full">
              <img
                className="max-w-screen-lg max-h-screen-lg object-contain rounded-md shadow-lg"
                src={media.img ? `${apiUpload}${media.img}` : ""}
                alt="gallery-photo"
              />
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
