import { Button } from './button'
import { Bike, CircleCheck } from 'lucide-react'
import React from 'react'
import { VStack } from './stack'
import { Texts } from './text'

export default function PaymentSuccess() {
  return (
   <div className='h-screen p-5'>    
    <VStack className='h-screen bg-green-50items-center justify-center border-inherit rounded-sm gap-6 '>
       <VStack className=' justify-center items-center'>
            <CircleCheck className='size-32' color="#1eb352" strokeWidth={0.5} />
            <Texts styles={"large"}>Your Pick-Up request placed Successfully</Texts>
            <Texts styles={"p_ui_medium"}>Request ID-#12435267725252727</Texts>
       </VStack>
       <VStack className=" justify-center items-center gap-14">
                <VStack className=' justify-center items-center'>
                    <Texts styles={"body"}>Our Pick-Up Partner will arrive soon to collect your Package.</Texts>
                    <Bike className='size-16' strokeWidth={1.5} />
                </VStack>
                <Button variant={"outline"}>Track Your Package</Button>
       </VStack>
    </VStack>
   </div>
  )
}