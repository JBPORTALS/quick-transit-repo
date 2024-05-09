import React from 'react'
import { RadioGroup, RadioGroupItem } from './radio-group'
import { HStack } from './stack'
import { Label } from './label'
import { ArrowLeftRight, AtSign } from 'lucide-react'
import { Button } from './button'
import { Texts } from './text'

export default function CustomerPayment() {
    return (
        <div className=" flex flex-col items-center justify-center gap-5" >
            <Texts styles={"h3"}>Payment</Texts>
            <HStack>
                <Texts styles={"p_ui_medium"}>Total Amount - </Texts>
                <Texts styles={"large"}>₹8700</Texts>
            </HStack>
            <RadioGroup >
                <div className="w-96 h-28 border-2  rounded-lg flex items-center justify-center gap-3 px-4" >
                    <RadioGroupItem value="option-five" className="border-2" id="option-five" />
                    <Label htmlFor="option-five" className="flex flex-col gap-1 py-2">
                        <h1 className='font-medium text-base leading-6'>Cash On Pick-up</h1>
                        <HStack className="font-medium text-xs leading-5">
                            <ArrowLeftRight size={50} strokeWidth={1} />
                            <p className="pt-1">Our customers uses this method at last moment of pick-up.</p>
                        </HStack>
                    </Label>
                </div>
                <div className="w-96 h-28 border-2  rounded-lg flex items-center justify-center gap-3 px-4" >
                    <RadioGroupItem value="option-six" className="border-2" id="option-six" />
                    <Label htmlFor="option-six" className="flex flex-col gap-1 py-2">
                        <h1 className='font-medium text-base leading-6'>UPI Payment</h1>
                        <HStack className="font-medium text-xs leading-5">
                            <AtSign size={50} strokeWidth={1} />
                            <p className="pt-1">Complete your payment through UPI transaction now and enjoy our service.</p>
                        </HStack>
                    </Label>

                </div>
            </RadioGroup>
            <HStack className='justify-end'>
                <Button variant={"outline"}>Overview</Button>
                <Button>Pick-Up</Button>
            </HStack>
        </div>

    )
}
