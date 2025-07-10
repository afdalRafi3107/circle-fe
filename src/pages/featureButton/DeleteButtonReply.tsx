import { Button } from "@/components/ui/button";
import { useDeleteReply } from "@/hooks/use-deleteReplt";
import { useDeleteThread } from "@/hooks/use-deleteThread";

interface deleteProps {
  id: number;
}

export function ButtonDeleteReply({ id }: deleteProps) {
  const { mutateAsync: mutateDelete } = useDeleteReply();

  const onsubmit = () => {
    mutateDelete(id);
    console.log(`id yang terambil : `, id);
  };
  return (
    <>
      <Button className=" p-0 text-white font-normal" onClick={onsubmit}>
        delete
      </Button>
    </>
  );
}
