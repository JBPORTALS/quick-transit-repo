import React from 'react'
import { ScrollArea, ScrollBar } from './scroll-area'
import { HStack, VStack } from './stack'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './dialog'
import { CirclePlus, MapPin } from 'lucide-react'
import { Text } from './text'
import { Label } from '@radix-ui/react-label'
import { Input } from './input'
import { Button } from './button'
import { RadioGroup, RadioGroupItem } from './radio-group'

export default function AddressField() {
  return (
        <ScrollArea className="w-screen h-full rounded-md ">
    <HStack className="w-full">
    <Dialog >
            <DialogTrigger>
                <div className="w-96 h-28 border-2 border-primary/30 border-dashed  rounded-lg flex gap-4 items-center px-3" >
                    <CirclePlus size={40} strokeWidth={1} />
                    <VStack className="">
                        <Text styles={"p_ui_medium"}>Add New Address</Text>
                        <Text styles={"details"}>This Address will save for further uses also.</Text>
                    </VStack>
                </div>
            </DialogTrigger>

            <DialogContent className=''>
                <DialogHeader >
                    <Text styles={"large"} className='text-start'>Add New Address</Text>
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
            <div className="w-96 h-28 border-2  rounded-lg flex items-center justify-center gap-3 px-4 " >
                <RadioGroupItem value="option-five" className="border-2" id="option-five" />
                <Label htmlFor="option-five" className="flex flex-col gap-1 py-2 cursor-pointer">
                    <h1 className='font-medium text-base leading-6'>Block A</h1>
                    <HStack className="font-medium text-xs leading-5"><MapPin size={50} strokeWidth={1} /><p className="pt-1">Our customers uses this method at last moment of pick-up.</p></HStack>
                </Label>
            </div>
            <div className="w-96 h-28 border-2  rounded-lg flex items-center justify-center gap-3 px-4" >
                <RadioGroupItem value="option-six" className="border-2" id="option-six" />
                <Label htmlFor="option-six" className="flex flex-col gap-1 py-2 cursor-pointer">
                    <h1 className='font-medium text-base leading-6'>Block B</h1>
                    <HStack className="font-medium text-xs leading-5"><MapPin size={50} strokeWidth={1} /><p className="pt-1">Our customers uses this method at last moment of pick-up.</p></HStack>
                </Label>

            </div>
        </RadioGroup>


    </HStack>
    <ScrollBar orientation="horizontal" />
</ScrollArea>
  )
}
