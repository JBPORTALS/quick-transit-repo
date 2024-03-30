import { BoxSelect, Calendar, CalendarCheck, CalendarDays, CheckCheck, PackageCheck, PhoneCall, StarHalfIcon, Truck, TruckIcon } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { StarFilledIcon } from '@radix-ui/react-icons'
import { Button } from './button'

export default function OrderStatus() {
  return (
    <div className='border h-full w-full rounded-md '>
      <div>
        <div className='flex gap-3 p-5 '>
          <div className='h-14 w-20 m-3 text-center border  '>
            BOX
          </div>
          <div>
            <h1 className='text-lg font-bold'>Question Paper (Bundle A)</h1>
            <div className='flex gap-3'>
              <h2 className='text-lg font-semibold'>23x10x10</h2>
              <h3 className='text-lg font-semibold'>2Kg</h3>
            </div>
            <div className='flex text-muted-foreground gap-1 '>
              <CalendarDays />
              <span className='text-lg'> Requested December 2021</span>
            </div>
          </div>

        </div>
        <div className='flex px-8'>
          <div className="border rounded-full w-12 bg-primary p-3 ">
            <PackageCheck color="#ffffff" />
          </div>
          <div className='pt-1 text-primary'>
            __________
          </div>
          <div className="border rounded-full w-12 bg-primary/50 p-3 ">
            <Truck color="#a83287" />
          </div>
          <div className='pt-1'>
            __________
          </div>
          <div className="border rounded-full w-12 bg-gray-400 p-3 ">
            <CheckCheck color="#ffffff" />
          </div>
        </div>
      </div>
      <div className=' flex gap-3 p-5'>
        <Avatar className='w-16 h-16 mt-3'>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-2'>
          <h1 className='font-semibold text-lg'>Rohith Varma</h1>
          <div className='flex text-muted-foreground gap-2 text-sm'><PhoneCall size={16}/> +91 8764567865</div>
          <div className='flex'>
            <StarFilledIcon color='#eff226' />
            <StarFilledIcon color='#eff226' />
            <StarFilledIcon color='#eff226' />
            <StarFilledIcon color='#eff226' />
          </div>
        </div>
      <div  className='mt-5 ml-10'>
        <Button>Review</Button>
      </div>
      </div>
    

    </div>
  )
}