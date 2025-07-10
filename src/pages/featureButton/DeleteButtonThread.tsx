import { Button } from "@/components/ui/button";
import { useDeleteThread } from "@/hooks/use-deleteThread";

interface deleteProps {
  id: number;
}

export function ButtonDeleteThread({ id }: deleteProps) {
  const { mutateDelete } = useDeleteThread();

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
