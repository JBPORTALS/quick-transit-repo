"use client"
import React, { useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    CheckCircle2Icon,
    ClipboardEdit,
    EllipsisVertical,
    FileDown,
    MoreHorizontalIcon,
    PhoneCall,
    Settings2,
    StarIcon,
    TruckIcon,
    User,
    X,
} from "lucide-react";

import { Button } from "@qt/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@qt/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@qt/ui/carousel";
import { Separator } from "@qt/ui/seperator";
import { HStack, VStack } from "@qt/ui/stack";
import { Tag } from "@qt/ui/tag";
import { Text } from "@qt/ui/text";
import { StarFilledIcon } from '@radix-ui/react-icons'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@qt/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
} from "@qt/ui/dialog"
import Search from '@qt/ui/searchBar';
import TrackingStatus, { AddStatus } from '@qt/ui/trackingStatus';
import Profile, { ProfileContent, ProfileLeft, ProfileRight } from '@qt/ui/profileCard';
import { Avatar, AvatarFallback, AvatarImage } from '@qt/ui/avatar';


export default function PackageDetails() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false); // State for Assign Pick-up Partner dialog

    const handleToggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    const handleOpenAssignDialog = () => {
        setIsAssignDialogOpen(true);
    };
    return (
        <VStack className="h-full max-h-fit w-full gap-5">
            <HStack className="relative grid h-full max-h-fit w-full grid-cols-4">
                <VStack className="col-span-3">
                    <Card className="col-span-3 w-full shadow-none">
                        <CardHeader>
                            <HStack className="items-center justify-between">
                                <CardTitle className="flex items-center gap-3">
                                    <Button asChild size={"icon"} variant={"ghost"}>
                                        <Link href={"/pickUp-partner"}>
                                            <ArrowLeft className="h-7 w-7" />
                                        </Link>
                                    </Button>
                                    Request Details
                                </CardTitle>
                                <HStack>
                                    <Button
                                        size={"md"}
                                        className="text-primary hover:text-primary"
                                        variant={"ghost"}
                                    >
                                        <FileDown className="h-5 w-5" /> Invoice
                                    </Button>
                                    <div className='h-20 '>
                                        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>

                                            <DropdownMenuTrigger><div className='h-10 p-2' onClick={handleToggleDropdown} ><MoreHorizontalIcon color="#000000" /> </div></DropdownMenuTrigger>

                                            <DropdownMenuContent className='mx-5'>
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={handleOpenAssignDialog}>
                                                    <User className='mr-2' /> Assign Pick-up Partner
                                                </DropdownMenuItem>
                                                <DropdownMenuItem> <X className='mr-2' />Cancel Request</DropdownMenuItem>
                                                <DropdownMenuItem><ClipboardEdit className='mr-2' /> Edit</DropdownMenuItem>
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


                                </HStack>
                            </HStack>
                        </CardHeader>
                        <CardContent>
                            <HStack className="gap-8">
                                <Carousel className="flex-3 h-fit max-h-[328px] w-full max-w-[389px] rounded-radius border">
                                    <CarouselContent>
                                        <CarouselItem className="relative h-[328px] rounded-sm">
                                            <Image src={"/package-1.jpg"} fill alt="package" />
                                        </CarouselItem>
                                        <CarouselItem className="relative h-[328px] w-full rounded-sm">
                                            <Image src={"/package-1.jpg"} fill alt="package" />
                                        </CarouselItem>
                                        <CarouselItem className="relative h-[328px] w-full rounded-sm">
                                            <Image src={"/package-1.jpg"} fill alt="package" />
                                        </CarouselItem>
                                    </CarouselContent>
                                    <div className=" absolute bottom-1/2 top-1/2 w-full px-5">
                                        <div className="flex justify-between">
                                            <CarouselPrevious />
                                            <CarouselNext />
                                        </div>
                                    </div>
                                </Carousel>

                                <VStack className=" w-full">
                                    <Text styles={"details"} className="text-muted-foreground">
                                        #14254252622625
                                    </Text>
                                    <Text styles={"p_ui_medium"}>
                                        {"DSIT Questions Papers (Bundle A)"}
                                    </Text>
                                    <HStack>
                                        <Tag>34x34x6 cm</Tag>
                                        <Tag>200g</Tag>
                                    </HStack>
                                    <Text styles={"details"} className="text-muted-foreground">
                                        Requested on 3 hours ago
                                    </Text>
                                    <Separator />
                                    <Text styles={"subtle_semibold"}>{"Pick-up Address"}</Text>
                                    <Text styles={"subtle"}>
                                        {"#678, Magadi Road, Chintamani, Banglore 512 076"}
                                    </Text>
                                    <Separator />
                                    <Text styles={"subtle_semibold"}>
                                        {"Received Franchise Address"}
                                    </Text>
                                    <Text styles={"subtle"}>
                                        {"#678, Magadi Road, Chintamani, Banglore 512 076"}
                                    </Text>
                                    <Separator />
                                    <Text styles={"subtle_semibold"}>
                                        {"Destination Address"}
                                    </Text>
                                    <Text styles={"subtle"}>
                                        {"#678, Magadi Road, Chintamani, Banglore 512 076"}
                                    </Text>
                                    <Separator />
                                    <Text styles={"subtle_semibold"}>{"Amount Charged"}</Text>
                                    <HStack className="items-center">
                                        <Text styles={"subtle"}>{"₹ 6,000"}</Text>
                                        <Tag variant={"success"}>
                                            <CheckCircle2Icon className="h-4 w-4" />
                                            Paid
                                        </Tag>
                                    </HStack>
                                </VStack>
                            </HStack>
                        </CardContent>
                    </Card>
                </VStack>

                <Card className="sticky top-0 h-full max-h-full w-full shadow-none">
                    <CardHeader>
                        <HStack className="items-center justify-between">
                            <CardTitle>Tracking Details</CardTitle>
                            <Tag variant={"gray"} className="py-2">
                                <TruckIcon className="h-5 w-5" />
                                <Text styles={"body_medium"}>Picking Up</Text>
                            </Tag>
                        </HStack>
                    </CardHeader>
                    <CardContent className='flex flex-col h-full'>
                        <TrackingStatus >
                            <AddStatus variant={"success"}>
                                <Text>Requested</Text>
                            </AddStatus>
                            <AddStatus variant={"success"}>
                                <Text>Confirmed</Text>
                            </AddStatus>
                            <AddStatus variant={"process"}>
                                <Text>Picked Up</Text>
                            </AddStatus>
                            <AddStatus >
                                <Text>Shipping</Text>
                                <Text styles={"details"} className="text-muted-foreground">
                            Tracking ID: #2782833782828
                        </Text>
                        <Button
                            size={"sm"}
                            className="px-0 text-primary hover:text-primary"
                            variant={"link"}
                        >
                            <FileDown className="h-4 w-4" /> Download Service Bill
                        </Button>
                        
                                
                                
                            </AddStatus>
                            <AddStatus>
                                <Text >Dilivered</Text>
                                
                            </AddStatus>
                        </TrackingStatus>
                        


                        <Profile className="w-full h-full">


                            <ProfileLeft>
                                <Avatar>
                                    <AvatarImage></AvatarImage>
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </ProfileLeft>
                            <ProfileContent>
                                <Text styles={"subtle_semibold"}>Rohith Varma</Text>
                                <Text styles={"details"} className="text-muted-foreground">
                                    <HStack className="gap-1 "><PhoneCall className="w-4 h-4 mt-1" />+91 982892828282</HStack></Text>
                                <HStack className="text-muted-foreground gap-0.5 ">
                                    <StarIcon className="w-3 h-3" />
                                    <StarIcon className="w-3 h-3" />
                                    <StarIcon className="w-3 h-3" />
                                    <StarIcon className="w-3 h-3" />
                                </HStack>
                            </ProfileContent>


                            <ProfileRight>
                                <Button variant={"outline"}>Review</Button></ProfileRight>

                        </Profile>

                    </CardContent>

                </Card>
            </HStack>
        </VStack>
    );
}