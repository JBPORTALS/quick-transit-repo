
import { HStack, VStack } from "./stack";
import { Tags } from "./tags";
import { Texts } from "./text";
import * as React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@qt/ui/carousel"
import { CirclePlus, MapPin } from "lucide-react";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Label } from "./label";
import { Button } from "./button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./dialog";
import { Input } from "./input";




export default function PackagePriceDetails() {

    return (
        <div className="flex flex-col gap-5">
            <VStack className="gap-4">
                <Texts styles={"h3"}>Overview</Texts>
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

                        <Texts styles={"p_ui_medium"}>DSIT Questions Papers (Bundle A)</Texts>
                        <HStack>
                            <Tags variant={"primary"}>78x23x120 cm</Tags>
                            <Tags variant={"primary"}>200 g</Tags>
                        </HStack>

                        <HStack className="gap-10">
                            <VStack>
                                <Texts styles={"body"}>Service Charge -</Texts>

                                <Texts styles={"body"}>Insurance Charge -</Texts>

                                <Texts styles={"body"}>Total Amount -</Texts>
                            </VStack>
                            <VStack>

                                <Texts styles={"p_ui_medium"}>₹700</Texts>


                                <Texts styles={"p_ui_medium"}>₹8000</Texts>


                                <Texts styles={"p_ui_medium"}>₹8700</Texts>
                            </VStack>
                        </HStack>


                    </VStack>
                </HStack>
                <Texts styles={"large"}>Pick-up Address</Texts>

                <ScrollArea className="w-screen h-full rounded-md ">
                    <HStack className="w-full">

                        <Dialog >
                            <DialogTrigger>
                                <div className="w-96 h-28 border-2 border-primary/30 border-dashed  rounded-lg flex gap-4 items-center px-3" >
                                    <CirclePlus size={40} strokeWidth={1} />
                                    <VStack className="">
                                        <Texts styles={"p_ui_medium"}>Add New Address</Texts>
                                        <Texts styles={"details"}>This Address will save for further uses also.</Texts>
                                    </VStack>
                                </div>
                            </DialogTrigger>

                            <DialogContent className=''>
                                <DialogHeader >
                                    <Texts styles={"large"} className='text-start'>Add New Address</Texts>
                                </DialogHeader>


                                <Label>
                                    Address
                                </Label>
                                <Input />
                                <HStack className='justify-end'>
                                    <Button variant={"outline"}>Discard</Button>
                                    <Button>Save</Button>
                                </HStack>




                            </DialogContent>
                        </Dialog>




                        <RadioGroup className="flex ">
                            <div className="w-96 h-28 border-2  rounded-lg flex items-center justify-center gap-3 px-4" >
                                <RadioGroupItem value="option-one" className="border-2" id="option-one" />
                                <Label htmlFor="option-one" className="flex flex-col gap-1 py-2">
                                    <h1 className='font-medium text-base leading-6'>Block A</h1>
                                    <HStack className="font-medium text-xs leading-5"><MapPin size={50} strokeWidth={1} /><p className="pt-1">Our customers uses this method at last moment of pick-up.</p></HStack>
                                </Label>
                            </div>
                            <div className="w-96 h-28 border-2  rounded-lg flex items-center justify-center gap-3 px-4" >
                                <RadioGroupItem value="option-two" className="border-2" id="option-two" />
                                <Label htmlFor="option-two" className="flex flex-col gap-1 py-2">
                                    <h1 className='font-medium text-base leading-6'>Block B</h1>
                                    <HStack className="font-medium text-xs leading-5"><MapPin size={50} strokeWidth={1} /><p className="pt-1">Our customers uses this method at last moment of pick-up.</p></HStack>
                                </Label>
                            </div>
                        </RadioGroup>


                    </HStack>
                    <ScrollBar orientation="horizontal" />

                </ScrollArea>






                <Texts styles={"large"}>Received Franchise Address</Texts>

                <ScrollArea className="w-screen h-full rounded-md ">
                    <HStack className="w-full">
                    <Dialog >
                            <DialogTrigger>
                                <div className="w-96 h-28 border-2 border-primary/30 border-dashed  rounded-lg flex gap-4 items-center px-3" >
                                    <CirclePlus size={40} strokeWidth={1} />
                                    <VStack className="">
                                        <Texts styles={"p_ui_medium"}>Add New Address</Texts>
                                        <Texts styles={"details"}>This Address will save for further uses also.</Texts>
                                    </VStack>
                                </div>
                            </DialogTrigger>

                            <DialogContent className=''>
                                <DialogHeader >
                                    <Texts styles={"large"} className='text-start'>Add New Address</Texts>
                                </DialogHeader>


                                <Label>
                                    Address
                                </Label>
                                <Input />
                                <HStack className='justify-end'>
                                    <Button variant={"outline"}>Discard</Button>
                                    <Button>Save</Button>
                                </HStack>




                            </DialogContent>
                        </Dialog>


                        <RadioGroup className="flex">
                            <div className="w-96 h-28 border-2  rounded-lg flex items-center justify-center gap-3 px-4" >
                                <RadioGroupItem value="option-three" className="border-2" id="option-three" />
                                <Label htmlFor="option-three" className="flex flex-col gap-1 py-2">
                                    <h1 className='font-medium text-base leading-6'>Block A</h1>
                                    <HStack className="font-medium text-xs leading-5"><MapPin size={50} strokeWidth={1} /><p className="pt-1">Our customers uses this method at last moment of pick-up.</p></HStack>
                                </Label>
                            </div>
                            <div className="w-96 h-28 border-2  rounded-lg flex items-center justify-center gap-3 px-4" >
                                <RadioGroupItem value="option-four" className="border-2" id="option-four" />
                                <Label htmlFor="option-four" className="flex flex-col gap-1 py-2">
                                    <h1 className='font-medium text-base leading-6'>Block B</h1>
                                    <HStack className="font-medium text-xs leading-5"><MapPin size={50} strokeWidth={1} /><p className="pt-1">Our customers uses this method at last moment of pick-up.</p></HStack>
                                </Label>
                            </div>
                        </RadioGroup>


                    </HStack>
                    <ScrollBar orientation="horizontal" />

                </ScrollArea>







                <Texts styles={"large"}>Destination Address</Texts>

                <ScrollArea className="w-screen h-full rounded-md ">
                    <HStack className="w-full">
                    <Dialog >
                            <DialogTrigger>
                                <div className="w-96 h-28 border-2 border-primary/30 border-dashed  rounded-lg flex gap-4 items-center px-3" >
                                    <CirclePlus size={40} strokeWidth={1} />
                                    <VStack className="">
                                        <Texts styles={"p_ui_medium"}>Add New Address</Texts>
                                        <Texts styles={"details"}>This Address will save for further uses also.</Texts>
                                    </VStack>
                                </div>
                            </DialogTrigger>

                            <DialogContent className=''>
                                <DialogHeader >
                                    <Texts styles={"large"} className='text-start'>Add New Address</Texts>
                                </DialogHeader>


                                <Label>
                                    Address
                                </Label>
                                <Input />
                                <HStack className='justify-end'>
                                    <Button variant={"outline"}>Discard</Button>
                                    <Button>Save</Button>
                                </HStack>




                            </DialogContent>
                        </Dialog>


                        <RadioGroup className="flex  ">
                            <div className="w-96 h-28 border-2  rounded-lg flex items-center justify-center gap-3 px-4" >
                                <RadioGroupItem value="option-five" className="border-2" id="option-five" />
                                <Label htmlFor="option-five" className="flex flex-col gap-1 py-2">
                                    <h1 className='font-medium text-base leading-6'>Block A</h1>
                                    <HStack className="font-medium text-xs leading-5"><MapPin size={50} strokeWidth={1} /><p className="pt-1">Our customers uses this method at last moment of pick-up.</p></HStack>
                                </Label>
                            </div>
                            <div className="w-96 h-28 border-2  rounded-lg flex items-center justify-center gap-3 px-4" >
                                <RadioGroupItem value="option-six" className="border-2" id="option-six" />
                                <Label htmlFor="option-six" className="flex flex-col gap-1 py-2">
                                    <h1 className='font-medium text-base leading-6'>Block B</h1>
                                    <HStack className="font-medium text-xs leading-5"><MapPin size={50} strokeWidth={1} /><p className="pt-1">Our customers uses this method at last moment of pick-up.</p></HStack>
                                </Label>

                            </div>
                        </RadioGroup>


                    </HStack>
                    <ScrollBar orientation="horizontal" />

                </ScrollArea>



            </VStack>
            <HStack className='justify-end'>
                <Button variant={"outline"}>Previous</Button>
                <Button>Continue</Button>
            </HStack>
        </div>
    )
}
