import React from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@qt/ui/table"
import { Settings2, Star } from 'lucide-react';
import { Button } from '@qt/ui/button';
import Link from 'next/link';
import Search from '@qt/ui/searchBar';


export default function Pickuppartner() {
  return (
    <main className='w-full'>
      <br />
      <div className='px-4 flex gap-2 items-center'>
      <Search placeholder="Search Pick-Up Partner here" />
        <Settings2 />
      </div>
      <br />
      <div className='m-10'>

        <Table className='border-collapse border border-gray-300 w-full divide-x-0'>
          <TableHeader>
            <TableRow>
              <TableHead>Slno.</TableHead>
              <TableHead>Partner Id</TableHead>
              <TableHead >Full name</TableHead>
              <TableHead >E-mail</TableHead>
              <TableHead >Phone no</TableHead>
              <TableHead >Package</TableHead>
              <TableHead >Average rating</TableHead>


            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>01</TableCell>
              <Link href={"/pickUp-partner/partnerDetails"}><TableCell>#a832873826r37</TableCell></Link>
              <TableCell>Jhon Doe</TableCell>
              <TableCell >jhondoe456@gmail.com</TableCell>
              <TableCell >9986577098</TableCell>
              <TableCell >888</TableCell>
              <TableCell className='flex py-3'>
                <Star className='' size={20} />
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>01</TableCell>
              <TableCell>#a832873826r37</TableCell>
              <TableCell>Jhon Doe</TableCell>
              <TableCell >jhondoe456@gmail.com</TableCell>
              <TableCell >9986577098</TableCell>
              <TableCell >888</TableCell>
              <TableCell className='flex py-3'>
                <Star className='' size={20} />
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>01</TableCell>
              <TableCell>#a832873826r37</TableCell>
              <TableCell>Jhon Doe</TableCell>
              <TableCell >jhondoe456@gmail.com</TableCell>
              <TableCell >9986577098</TableCell>
              <TableCell >888</TableCell>
              <TableCell className='flex py-3'>
                <Star className='' size={20} />
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>01</TableCell>
              <TableCell>#a832873826r37</TableCell>
              <TableCell>Jhon Doe</TableCell>
              <TableCell >jhondoe456@gmail.com</TableCell>
              <TableCell >9986577098</TableCell>
              <TableCell >888</TableCell>
              <TableCell className='flex py-3'>
                <Star className='' size={20} />
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>01</TableCell>
              <TableCell>#a832873826r37</TableCell>
              <TableCell>Jhon Doe</TableCell>
              <TableCell >jhondoe456@gmail.com</TableCell>
              <TableCell >9986577098</TableCell>
              <TableCell >888</TableCell>
              <TableCell className='flex py-3'>
                <Star className='' size={20} />
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>01</TableCell>
              <TableCell>#a832873826r37</TableCell>
              <TableCell>Jhon Doe</TableCell>
              <TableCell >jhondoe456@gmail.com</TableCell>
              <TableCell >9986577098</TableCell>
              <TableCell >888</TableCell>
              <TableCell className='flex py-3'>
                <Star className='' size={20} />
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>01</TableCell>
              <TableCell>#a832873826r37</TableCell>
              <TableCell>Jhon Doe</TableCell>
              <TableCell >jhondoe456@gmail.com</TableCell>
              <TableCell >9986577098</TableCell>
              <TableCell >888</TableCell>
              <TableCell className='flex py-3'>
                <Star className='' size={20} />
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>01</TableCell>
              <TableCell>#a832873826r37</TableCell>
              <TableCell>Jhon Doe</TableCell>
              <TableCell >jhondoe456@gmail.com</TableCell>
              <TableCell >9986577098</TableCell>
              <TableCell >888</TableCell>
              <TableCell className='flex py-3'>
                <Star className='' size={20} />
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className='flex gap-5 p-6 justify-between'>
          <div>
            <span className='font-semibold '>30 rows total</span>
          </div>
          <div className='flex gap-3'>
            <Button variant={'secondary'}>Previous</Button>
            <Button>Next</Button>
          </div>
        </div>
      </div>
      
    </main>
  )
}