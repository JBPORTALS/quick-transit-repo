import React, { useState } from 'react'
import { HStack, VStack } from './stack'
import { Texts } from './text'
import { Tags } from './tags'
import { Download, Edit, EllipsisVertical, Package, X } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./dropdown-menu"
import { Button } from './button'
import { Dialog, DialogContent, DialogHeader } from './dialog'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@qt/ui/carousel"


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
        <HStack>
            <HStack className='gap-6'>

            <Carousel className="max-h-[278px] max-w-[339px]">
                <CarouselContent>
                    <CarouselItem>
                        <img src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg" alt="" />
                    </CarouselItem>
                    <CarouselItem>
                        <img src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg" alt="" />
                    </CarouselItem>
                    <CarouselItem>
                        <img src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg" alt="" />
                    </CarouselItem>


                </CarouselContent>
                <div className=" absolute top-1/2 bottom-1/2 w-full px-5">
                    <div className="flex justify-between">

                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </div>
            </Carousel>
                <VStack className=''>
                    <Texts styles={"details"} className='text-muted-foreground' >#12435267725252727</Texts>
                    <Texts styles={"p_ui_medium"}>DSIT Questions Papers (Bundle A)</Texts>
                    <HStack>
                        <Tags variant={"primary"}>78x23x120 cm</Tags>
                        <Tags variant={"primary"}>200 g</Tags>
                    </HStack>
                    <Texts styles={"body_medium"}>Pick-up Address</Texts>
                    <Texts styles={"subtle"}>#678, Magadi Road, Chintamani, Banglore 512 076</Texts>
                    <Texts styles={"body_medium"}>Received Franchise Address</Texts>
                    <Texts styles={"subtle"}>#123, 2nd Main Road, MG Road, Banglore 512 076</Texts>
                    <Texts styles={"body_medium"}>Destination Address</Texts>
                    <Texts styles={"subtle"}>#123, 2nd Main Road, MG Road, Banglore 512 076</Texts>
                    <HStack>
                        <Texts styles={"body_medium"}>Amount Charged -</Texts>
                        <Texts styles={"large"}>₹800</Texts>
                    </HStack>


                </VStack>
            </HStack>
           
                <VStack className='gap-8 border-l px-5'>
                    <VStack>
                        <Texts styles={"details"}>Service Invoice</Texts>
                        <HStack className='h-36 w-52 border rounded-lg  items-end'>
                            <VStack className='w-full h-11 border bg-white bg-transparent/5  items-end '>
                                <button className='p-1 mr-2  m-1 border bg-white rounded-lg'><Download /></button>
                            </VStack>
                        </HStack>
                    </VStack>
                    <VStack className='gap-1'>
                        <Texts styles={"subtle_medium"}>Delivered Package Details</Texts>
                        <Texts styles={"details"}>Package Tracking ID</Texts>
                        <Texts styles={"details"} className='text-muted-foreground'>#3787292376262638827</Texts>

                        <VStack className='pt-5'>
                            <Texts styles={"details"}>Image Of Reciept</Texts>
                            <HStack className='h-36 w-52 border rounded-lg  items-end'>
                                <VStack className='w-full h-11 border bg-white bg-transparent/5  items-end '>
                                    <button className='p-1 mr-2  m-1 border bg-white rounded-lg'><Download /></button>
                                </VStack>
                            </HStack>
                        </VStack>
                    </VStack>
                </VStack>

                <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>

                                <DropdownMenuTrigger><div className='border rounded-lg h-10 p-2' onClick={handleToggleDropdown} ><EllipsisVertical size={20} color="#000000" /> </div></DropdownMenuTrigger>

                                <DropdownMenuContent className='mx-5'>
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem >
                                    <Texts styles={"subtle_medium"}> <HStack><Edit /> Edit Package</HStack></Texts>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleOpenAssignDialog}>
                                    <Texts styles={"subtle_medium"} className='text-red-500'><HStack> <Package />Cancel Request</HStack></Texts></DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen} >


                                <DialogContent className=''>
                                    <DialogHeader >
                                    <Texts styles={"large"} className='text-start'>Are you sure want to cancel the request?</Texts>
                                    </DialogHeader>
                                    
                                       
                                   <Texts styles={"subtle"} className='text-muted-foreground text-start'>This action cannot be undone. This will permanently cancel your request.</Texts> 
                                   <HStack className='justify-end'>
                                    <Button variant={"outline"}>Cancel</Button>
                                    <Button variant={"destructive"}>Cancel Request</Button>
                                   </HStack>

                                       

                                
                                </DialogContent>
                            </Dialog>

          
        </HStack>
    )
}
