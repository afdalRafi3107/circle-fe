import { LeftBar } from "./sidebars/leftBar";
import { RightBar } from "./sidebars/rightBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <LeftBar />

      <section className=" w-300">{children}</section>

      <RightBar />
    </div>
  );
}
