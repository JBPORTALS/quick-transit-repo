import React from 'react'
import OrderStatus from './orderStatus'

export default function Rightbar() {
  return (
    <div className='border rounded-md my-8 pt-6 px-6 flex flex-col gap-2'>
      <div className=' flex flex-col  gap-2 border-b pb-2'>
        <h1 className='font-bold text-xl'>Ongoing Deliveries</h1>
        <h2 className='text-xl text-muted-foreground'>Today</h2>
      </div>
      <div className='h-14 p-2'>
        

      </div>
      <div>
        <div className='py-3.5'>
          <OrderStatus />
        </div>
        <div className='py-3.5'>
          <OrderStatus />
        </div>
        <div className='py-3.5'>
          <OrderStatus />
        </div>
      </div>
    </div>
  )
}