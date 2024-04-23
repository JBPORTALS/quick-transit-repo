// "use client"
// import Sidebar, { SidebarBody, SidebarItem, SidebarLabel } from '@qt/ui/sidebar'
// import { HStack } from '@qt/ui/stack'
// import { Bike, LayoutGrid, Package2Icon, Users, Wallet } from 'lucide-react'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import React from 'react'

// export default function SidebarClient() {
//     const pathname = usePathname()
//     return (
//         <Sidebar>
//             <SidebarLabel>Manager</SidebarLabel>

//             <SidebarBody>   

//                     <SidebarItem isActive={pathname === "/"}>
//                     <Link href={"/"}>
//                     <HStack>
//                         <LayoutGrid /> Dashboard
//                         </HStack>
//                         </Link>
//                     </SidebarItem>


//                     <SidebarItem isActive={pathname === "/requests"}>
//                     <Link href={"/requests"}>
//                     <HStack>
//                         <Package2Icon /> Requests
//                         </HStack>
//                         </Link>
//                     </SidebarItem>


//                     <SidebarItem isActive={pathname === "/customers"}>
//                     <Link href={"/customers"}>
//                     <HStack>
//                         <Users /> Customers
//                         </HStack>
//                         </Link>
//                     </SidebarItem>


//                     <SidebarItem isActive={pathname === "/pickUp-partner"}>
//                     <Link href={"/pickUp-partner"}>
//                     <HStack>
//                         <Bike /> PickUp Partners
//                         </HStack>
//                         </Link>
//                     </SidebarItem>


//                     <SidebarItem isActive={pathname === "/payments"}>
//                     <Link href={"/payments"}>
//                     <HStack>
//                         <Wallet /> Payments
//                         </HStack>
//                         </Link>
//                     </SidebarItem>

//             </SidebarBody>
//         </Sidebar>
//     )
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bike, LayoutGrid, Package2Icon, PackagePlusIcon, Users, Wallet } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@qt/ui/avatar";
import { Button } from "@qt/ui/button";
import Sidebar, {
    SidebarBody,
    SidebarBottomContent,
    SidebarItem,
    SidebarLabel,
} from "@qt/ui/sidebar";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";
import { ThemeToggle } from "@qt/ui/theme";

export default function SidebarClient() {
    const pathname = usePathname();
    return (
        <Sidebar
            className="h-screen w-full border-r"
            iconItem={
                <HStack className="w-full items-center justify-between gap-1">
                    <Image src={"/qt-logo.png"} height={40} width={40} alt="QT Logo" />
                    <Text styles={"p_ui_medium"}>Quick Transitt</Text>
                    <ThemeToggle />
                </HStack>
            }
        >
            <SidebarLabel>Manager</SidebarLabel>

            <SidebarBody>

                <Link href={"/"} className="w-full">
                    <SidebarItem isActive={pathname === "/"}>
                        <LayoutGrid /> Dashboard
                    </SidebarItem>
                </Link>


                
                    <Link href={"/requests"}>
                    <SidebarItem isActive={pathname === "/requests"}>
                            <Package2Icon /> Requests
                            </SidebarItem>
                    </Link>
              


                
                    <Link href={"/customers"}>
                    <SidebarItem isActive={pathname === "/customers"}>
                            <Users /> Customers
                            </SidebarItem>
                    </Link>
               


               
                    <Link href={"/pickUp-partner"}>
                    <SidebarItem isActive={pathname === "/pickUp-partner"}>
                            <Bike /> PickUp Partners
                            </SidebarItem>
                    </Link>
               


                
                    <Link href={"/payments"}>
                    <SidebarItem isActive={pathname === "/payments"}>
                            <Wallet /> Payments
                            </SidebarItem>
                    </Link>
               

            </SidebarBody>
            <SidebarBottomContent>
                <HStack className="items-center">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <VStack className="w-full gap-0 overflow-hidden">
                        <Text styles={"p_ui_medium"}>IG Institution</Text>
                        <Text styles={"body"} className="w-full text-muted-foreground">
                            iginstitutescontantme@gmail.com
                        </Text>
                    </VStack>
                </HStack>
            </SidebarBottomContent>
        </Sidebar>
    );
}