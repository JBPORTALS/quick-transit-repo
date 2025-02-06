import HeaderClient from "../_components/headerClient";

export default function RootLayout(props: {
  children: React.ReactNode;
  subheader: React.ReactNode;
}) {
  return (
    <div className="relative h-full w-full gap-0">
      <HeaderClient />
      <div className=" w-full">
        <div className="flex flex-col px-44 py-6">{props.children}</div>
      </div>
    </div>
  );
}
