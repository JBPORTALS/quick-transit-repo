import HeaderClient from "../../_components/headerClient";
import SidebarClient from "../../_components/SidebarClient";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <div className="relative grid h-full w-full grid-cols-6 gap-0">
      <SidebarClient />
      <div className="col-span-5 overflow-y-scroll">
        <HeaderClient />
        <div className="flex flex-col p-5">{props.children}</div>
      </div>
    </div>
  );
}
