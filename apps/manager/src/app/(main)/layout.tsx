import NextTopLoader from "nextjs-toploader";

import HeaderClient from "../_components/headerClient";

export default function RootLayout(props: {
  children: React.ReactNode;
  subheader: React.ReactNode;
}) {
  return (
    <div className="relative h-full w-full gap-0">
      <NextTopLoader
        showSpinner={false}
        color="linear-gradient(to right, rgb(107, 33, 168), rgb(76, 29, 149), rgb(107, 33, 168))"
      />
      <HeaderClient />

      <div className="col-span-5">
        <div className="flex flex-col px-44 py-6">{props.children}</div>
      </div>
    </div>
  );
}
