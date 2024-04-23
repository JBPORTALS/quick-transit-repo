"use client"
import React, { useState } from 'react'
import { Button } from './button'
import {  CheckCheck, CheckCircle, CircleIcon, ClipboardEdit, EllipsisVertical, IndianRupee, Mail, PackageCheck, Settings2, Truck, User, X } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
} from "@qt/ui/dialog"


import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { StarFilledIcon } from '@radix-ui/react-icons'
import Search from './searchBar'



export default function OrderDetails() {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false); // State for Assign Pick-up Partner dialog

    const handleToggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    const handleOpenAssignDialog = () => {
        setIsAssignDialogOpen(true);
    };


    return (
        <div className='p-6'>
            <div className=' flex justify-between '>


                <img className='h-60 w-1/3 border rounded-lg' src='https://etimg.etb2bimg.com/photo/73580618.cms' />

                <div className='flex flex-col gap-3'>
                    <span className=' text-muted-foreground'>#a832873826r37</span>
                    <h1 className='font-semibold'>
                        DSIT Question Papers (Bundle A)
                    </h1>
                    <div className='flex gap-2'>
                        <Button className='rounded-3xl bg-primary/50 h-5  text-primary'>78x23x120 cm</Button>
                        <Button className='rounded-3xl bg-primary/50 h-5   text-primary'>200 g</Button>
                    </div>
                    <div className='flex flex-col gap-2 w-60'>
                        <span className='text-sm font-semibold'>
                            Pick-Up Address
                        </span>
                        <span className='text-xs text-muted-foreground'>
                            #678, Magadi Road, Chintamani, Banglore 512 076
                        </span>
                    </div>
                    <div className='flex flex-col gap-2  '>
                        <span className='text-sm font-semibold'>
                            Delivery Address
                        </span>
                        <span className='text-xs text-muted-foreground'>
                            #123, 2nd Main Road, MG Road, Banglore 512 076
                        </span>
                    </div>
                    <div className='flex flex-col gap-2 w-60 '>
                        <span className='text-sm font-semibold'>
                            Destination Address
                        </span>
                        <span className='text-xs text-muted-foreground'>
                            #123, 2nd Main Road, MG Road, Banglore 512 076
                        </span>
                        <div className='flex font-bold'>Amount Charged -  <IndianRupee height={15} width={15} className='m-1' /> 800</div>
                        <Button className='h-7 bg-green-700 text-white'><CheckCircle color='#ffffff' height={15} className='mr-2' /> Paid</Button>
                    </div>

                </div>
                <div className='flex'>
                    <div className='border-l  px-5 my-4 mx-4 flex flex-col gap-5'>
                        <div>
                            <h1 className='text-xs font-bold '>Package Tracking ID</h1>
                            <span className='text-xs text-muted-foreground'>#3787292376262638827</span>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-sm font-bold '>Image of Invoice</h1>
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe-q2FFmJ_UuLu8kHNERRmsJz_ZAGDX4cgPQ&usqp=CAU' className='h-24 w-28 border rounded-sm' />

                            <h1 className='text-sm font-bold '>Service Bill</h1>

                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe-q2FFmJ_UuLu8kHNERRmsJz_ZAGDX4cgPQ&usqp=CAU' className='h-24 w-28 border rounded-sm' />

                        </div>




                    </div>
                    <div>
                        <div className='h-20 '>
                            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>

                                <DropdownMenuTrigger><div className='border rounded-sm h-10 p-2' onClick={handleToggleDropdown} ><EllipsisVertical size={20} color="#000000" /> </div></DropdownMenuTrigger>

                                <DropdownMenuContent className='mx-5'>
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleOpenAssignDialog}>
                                       <User className='mr-2'/> Assign Pick-up Partner
                                    </DropdownMenuItem>
                                    <DropdownMenuItem> <X  className='mr-2'/>Cancel Request</DropdownMenuItem>
                                    <DropdownMenuItem><ClipboardEdit className='mr-2'/> Edit</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen} >


                                <DialogContent>
                                    <DialogHeader className='pb-2 border-b-2 border-black font-bold w-full'>
                                        Assign Pick-up Partner
                                    </DialogHeader>
                                    <DialogDescription>
                                        <div className='px-4 flex gap-5 py-2 pb-5 items-center'>
                                        
                                        <Search placeholder="Search Pick-Up Partner here" />
                                        <Settings2 />
                                        </div>
                                        <span>Who are all free at currently selected package time slot  will display in descending order.</span>
                                        <div className='pt-5 flex justify-between px-4'>
                                            <div className='flex gap-3'>
                                                <img src="https://github.com/shadcn.png" className='h-12 w-15 rounded-md' />
                                                <div className='flex flex-col gap-2'>
                                                    <h1 className='text-sm font-semibold text-black'>
                                                        Elizabeth Lopez
                                                    </h1>
                                                    <span className='flex'>
                                                        <StarFilledIcon color='#eff226' />
                                                        <StarFilledIcon color='#eff226' />
                                                        <StarFilledIcon color='#eff226' />
                                                        <StarFilledIcon color='#A3A3A3' />
                                                        <StarFilledIcon color='#A3A3A3' />
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <Button className='text-white'>Assign</Button>
                                            </div>
                                        </div>


                                        <div className='pt-5 flex justify-between px-4'>
                                            <div className='flex gap-3'>
                                                <img src="https://github.com/shadcn.png" className='h-12 w-15 rounded-md' />
                                                <div className='flex flex-col gap-2'>
                                                    <h1 className='text-sm font-semibold text-black'>
                                                        Elizabeth Lopez
                                                    </h1>
                                                    <span className='flex'>
                                                        <StarFilledIcon color='#eff226' />
                                                        <StarFilledIcon color='#eff226' />
                                                        <StarFilledIcon color='#eff226' />
                                                        <StarFilledIcon color='#A3A3A3' />
                                                        <StarFilledIcon color='#A3A3A3' />
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <Button variant={'outline'}>Assign</Button>
                                            </div>
                                        </div>


                                        <div className='pt-5 flex justify-between px-4'>
                                            <div className='flex gap-3'>
                                                <img src="https://github.com/shadcn.png" className='h-12 w-15 rounded-md' />
                                                <div className='flex flex-col gap-2'>
                                                    <h1 className='text-sm font-semibold text-black'>
                                                        Elizabeth Lopez
                                                    </h1>
                                                    <span className='flex'>
                                                        <StarFilledIcon color='#eff226' />
                                                        <StarFilledIcon color='#eff226' />
                                                        <StarFilledIcon color='#eff226' />
                                                        <StarFilledIcon color='#A3A3A3' />
                                                        <StarFilledIcon color='#A3A3A3' />
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <Button variant={'outline'}>Assign</Button>
                                            </div>
                                        </div>


                                        <div className='pt-5 flex justify-between px-4'>
                                            <div className='flex gap-3'>
                                                <img src="https://github.com/shadcn.png" className='h-12 w-15 rounded-md' />
                                                <div className='flex flex-col gap-2'>
                                                    <h1 className='text-sm font-semibold text-black'>
                                                        Elizabeth Lopez
                                                    </h1>
                                                    <span className='flex'>
                                                        <StarFilledIcon color='#eff226' />
                                                        <StarFilledIcon color='#eff226' />
                                                        <StarFilledIcon color='#eff226' />
                                                        <StarFilledIcon color='#A3A3A3' />
                                                        <StarFilledIcon color='#A3A3A3' />
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <Button variant={'outline'}>Assign</Button>
                                            </div>
                                        </div>
                                    </DialogDescription>
                                </DialogContent>
                            </Dialog>
                        </div>

                    </div>
                </div>
            </div>

            <div className='mt-10 ml-4'>
                <h1 className='font-bold '>Associated Memebers</h1>
                <div className='flex gap-10'>
                    <div className='m-5 flex flex-col gap-5 border rounded-xl w-1/3 p-3 shadow-lg  '>
                        <h1 className='font-semibold text-sm'>Requested Customer</h1>
                        <div className='flex gap-4'>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback >CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className='font-semibold text-sm '>
                                    Rohith Varma
                                </h1>
                                <span className='flex text-sm text-muted-foreground '><Mail width={15} className='mr-1 mt-0.5' /><p className='pt-1'> robin@gmail.com</p></span>
                            </div>
                        </div>
                    </div>

                    <div className='m-5 flex flex-col gap-5 border rounded-xl w-1/3 p-3 shadow-lg  '>
                        <h1 className='font-semibold text-sm'>Assigned Pickup Partner</h1>
                        <div className='flex gap-4'>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback >CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className='font-semibold text-sm '>
                                    Rohith Varma
                                </h1>
                                <span className='flex text-sm text-muted-foreground '><Mail width={15} className='mr-1 mt-0.5' /><p className='pt-1'> robin@gmail.com</p></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-10 ml-4 flex flex-col gap-5'>
                <h1 className='font-bold '>Tracking Details</h1>
                <div className='flex gap-48 pt-5'>
                    <span >
                        Request Accepted
                    </span>
                    <span>
                        Your Package Received
                    </span>
                    <span >
                        Delivered
                    </span>
                </div>
                <div>
                    <div className='flex px-8'>

                        <div className="border rounded-full w-12 bg-primary p-3 ">

                            <PackageCheck color="#ffffff" />
                        </div>
                        <div className='pt-1 text-primary  flex'>
                            _______________<CircleIcon className='pt-3' />______________
                        </div>
                        <div className="border rounded-full  w-12 bg-primary p-3 ">
                            <Truck color="#ffffff" />
                        </div>
                        <div className='pt-1 text-primary'>
                            _______________________________
                        </div>
                        <div className="border rounded-full w-12  bg-primary bg-gray-400 p-3 ">
                            <CheckCheck color="#ffffff" />
                        </div>
                    </div>
                </div>
                <div>
                    <span className='pl-40'>Customer Verified</span>
                </div>
            </div>



            <div className='mt-10 ml-4'>
                <h1 className='font-bold '>Reviews</h1>
                <div className='flex gap-10'>
                    <div className='m-5 flex flex-col gap-5 border rounded-xl w-1/3 p-3 shadow-lg  '>
                        <h1 className='font-semibold text-sm'>Review for PickUp-Partner</h1>
                        <div className='flex gap-4'>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback >CN</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col gap-1'>
                                <div className='flex pb-2'>
                                    <StarFilledIcon color='#eff226' />
                                    <StarFilledIcon color='#eff226' />
                                    <StarFilledIcon color='#eff226' />
                                    <StarFilledIcon color='#A3A3A3' />
                                    <StarFilledIcon color='#A3A3A3' />
                                </div>
                                <h1 className='font-semibold text-sm '>
                                    Robert Hood
                                </h1>
                                <span className='flex text-sm text-muted-foreground '>
                                    Very Good Service By Parter
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='m-5 flex flex-col gap-5 border rounded-xl w-1/3 p-3 shadow-lg  '>
                        <h1 className='font-semibold text-sm'>Review for Company</h1>
                        <div className='flex gap-4'>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback >CN</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col gap-1'>
                                <div className='flex pb-2'>
                                    <StarFilledIcon color='#eff226' />
                                    <StarFilledIcon color='#eff226' />
                                    <StarFilledIcon color='#eff226' />
                                    <StarFilledIcon color='#A3A3A3' />
                                    <StarFilledIcon color='#A3A3A3' />
                                </div>
                                <h1 className='font-semibold text-sm '>
                                    Robert Hood
                                </h1>
                                <span className='flex text-sm text-muted-foreground '>
                                    Very Good Service By Parter
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>




        </div>
    )
}