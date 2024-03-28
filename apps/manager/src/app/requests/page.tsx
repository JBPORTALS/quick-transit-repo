"use client";
import React from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@qt/ui/table"
import { Settings2, Star } from 'lucide-react';
import { Button } from '@qt/ui/button';
import Link from 'next/link';
import Search from '@qt/ui/searchBar';


export default function RequestPage() {
  return (
    <main className='w-full '>
      <div className='px-4 flex gap-2 items-center  mt-10'>
      <Search placeholder="Search Pick-Up Partner here" />
        <Settings2 />
      </div>
      <br />
      <div className='m-10 '>

        <Table className='border-collapse border border-gray-300 w-full divide-x-0'>
          <TableHeader>
            <TableRow>
              <TableHead>Slno.</TableHead>
              <TableHead>Request ID</TableHead>
              <TableHead >Package</TableHead>
              <TableHead >Demension</TableHead>
              <TableHead >Weight</TableHead>
              <TableHead >Pick-up Partner</TableHead>
              <TableHead >Average rating</TableHead>


            </TableRow>
          </TableHeader>
          <TableBody>
            
            <TableRow>
              <TableCell>01</TableCell>
              <Link href={"/requests/orders"}><TableCell>#12435267725252727</TableCell></Link>
              <TableCell>Questions Papers (Bundle A) </TableCell>
              <TableCell >23x45x10</TableCell>
              <TableCell >20 Kg</TableCell>
              <TableCell >Elizabeth Lopez</TableCell>
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
              <Link href={"/requests/orders"}><TableCell>#12435267725252727</TableCell></Link>
              <TableCell>Questions Papers (Bundle A) </TableCell>
              <TableCell >23x45x10</TableCell>
              <TableCell >20 Kg</TableCell>
              <TableCell >Elizabeth Lopez</TableCell>
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
              <Link href={"/requests/orders"}><TableCell>#12435267725252727</TableCell></Link>
              <TableCell>Questions Papers (Bundle A) </TableCell>
              <TableCell >23x45x10</TableCell>
              <TableCell >20 Kg</TableCell>
              <TableCell >Elizabeth Lopez</TableCell>
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
              <Link href={"/requests/orders"}><TableCell>#12435267725252727</TableCell></Link>
              <TableCell>Questions Papers (Bundle A) </TableCell>
              <TableCell >23x45x10</TableCell>
              <TableCell >20 Kg</TableCell>
              <TableCell >Elizabeth Lopez</TableCell>
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
              <Link href={"/requests/orders"}><TableCell>#12435267725252727</TableCell></Link>
              <TableCell>Questions Papers (Bundle A) </TableCell>
              <TableCell >23x45x10</TableCell>
              <TableCell >20 Kg</TableCell>
              <TableCell >Elizabeth Lopez</TableCell>
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
              <Link href={"/requests/orders"}><TableCell>#12435267725252727</TableCell></Link>
              <TableCell>Questions Papers (Bundle A) </TableCell>
              <TableCell >23x45x10</TableCell>
              <TableCell >20 Kg</TableCell>
              <TableCell >Elizabeth Lopez</TableCell>
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
              <Link href={"/requests/orders"}><TableCell>#12435267725252727</TableCell></Link>
              <TableCell>Questions Papers (Bundle A) </TableCell>
              <TableCell >23x45x10</TableCell>
              <TableCell >20 Kg</TableCell>
              <TableCell >Elizabeth Lopez</TableCell>
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
              <Link href={"/requests/orders"}><TableCell>#12435267725252727</TableCell></Link>
              <TableCell>Questions Papers (Bundle A) </TableCell>
              <TableCell >23x45x10</TableCell>
              <TableCell >20 Kg</TableCell>
              <TableCell >Elizabeth Lopez</TableCell>
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
      </div>
      <br />
    </main>
  )
}