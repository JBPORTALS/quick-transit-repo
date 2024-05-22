"use client";

import { usePathname } from "next/navigation";
import { BellIcon } from "lucide-react";

import { Button } from "@qt/ui/button";
import { Header, HeaderRight, HeaderTitle } from "@qt/ui/header";
import { useEffect, useState } from "react";


export default function HeaderClient() {
    const pathname = usePathname(); // Use the usePathname hook to get the current path
    const [title, setTitle] = useState(''); // State to store the title

    useEffect(() => {
        // Update the title dynamically based on the current URL path
        const formattedTitle = formatTitle(pathname);
        setTitle(formattedTitle);
    }, [pathname]);

    // Function to format the title
    const formatTitle = (path:any) => {
        if (path === '/') {
            return 'Dashboard'; // Set title to "Dashboard" if URL is "/"
        } else {
            // Remove leading "/"
            const formattedPath = path.startsWith('/') ? path.slice(1) : path;
            // Capitalize first letter
            return formattedPath.charAt(0).toUpperCase() + formattedPath.slice(1);
        }
    };

  return (
    <Header className="sticky top-0">
      <HeaderTitle>
        {title}
      </HeaderTitle>
      <HeaderRight>
        <Button size={"icon"} variant={"ghost"}>
          <BellIcon className="h-5 w-5" />
        </Button>
      </HeaderRight>
    </Header>
  );
}