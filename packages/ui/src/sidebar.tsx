"use client"
import NavItem from './nav-item'
import { Bike, BoxIcon, LayoutDashboardIcon, Truck, UsersIcon, Wallet } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className=' h-screen px-3 py-8 w-60 flex flex-col justify-between'>
      <div className=' flex flex-col  gap-3'>
        <h1 className='text-lg items-center flex justify-center gap-3  text-pink-700 font-bold'><Truck size={28} color="#a83287" />Quick Transitt</h1>
        <h2 className='flex justify-center py-4 font-bold text-lg'>Manager</h2>


        <NavItem isActive={pathname === "/"}>
          <Link href={"/"} className='flex'>
            <LayoutDashboardIcon className="mr-2 " /> Dashboard
          </Link>
        </NavItem>

     
        <NavItem isActive={pathname === "/requests"}>
          <Link href={"/requests"} className='flex'>
            <BoxIcon className="mr-2" /> Requests
            </Link>
          </NavItem>
      
    
          <NavItem isActive={pathname === "/customers"}>
          <Link href={"/customers"} className='flex'>
            <UsersIcon className="mr-2" /> Customers
            </Link>
          </NavItem>

       
          <NavItem isActive={pathname === "/pickUp-partner"}>
          <Link href={"/pickUp-partner"} className='flex'>
            <Bike className="mr-2" /> PickUp Partners
            </Link>
          </NavItem>

        
          <NavItem isActive={pathname === "/payments"}>
          <Link href={"/payments"} className='flex'>
            <Wallet className="mr-2" /> Payments
            </Link>
          </NavItem>
   
      </div>
      <div className=' flex justify-center gap-2'>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className='font-semibold text-lg'><Link href={"/profile"}>Quick Transit</Link></h1>
          <span>contact@iginsititution...</span>
        </div>
      </div>
    </div>
  )
}