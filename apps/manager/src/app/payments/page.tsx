import React from 'react'
import {
  Command,
  CommandInput,

} from "@qt/ui/search";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@qt/ui/table"
import { Settings2 } from 'lucide-react';
import { Button } from '@qt/ui/button';
import Search  from '@qt/ui/searchBar';


export default function PaymentsPage() {
  return (
    <main className='w-full'>
      <br />
      <div className='px-4 flex gap-2 items-center'>
       
       
        <Search placeholder="Search payments here" />

        
       
        <Settings2 />
      </div>
      <br />
      <div className='m-10'>

        <Table className='border-collapse border border-gray-300 w-full divide-x-0'>
          <TableHeader>
            <TableRow>
              <TableHead>Slno.</TableHead>
              <TableHead>Transaction Id</TableHead>
              <TableHead >Customer</TableHead>
              <TableHead >Requested ID</TableHead>
              <TableHead >Amount</TableHead>
              <TableHead >Status</TableHead>
              <TableHead >Paid on</TableHead>


            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>01</TableCell>
             <TableCell>#12435267725252727</TableCell>
              <TableCell>Elizabeth Lopez</TableCell>
              <TableCell >#12435267725252727</TableCell>
              <TableCell >₹ 7,800</TableCell>
              <TableCell ><Button className='bg-green-200 h-6' >Paid</Button></TableCell>
             <TableCell>10/09/2023</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>01</TableCell>
             <TableCell>#12435267725252727</TableCell>
              <TableCell>Elizabeth Lopez</TableCell>
              <TableCell >#12435267725252727</TableCell>
              <TableCell >₹ 7,800</TableCell>
              <TableCell ><Button className='bg-green-200 h-6' >Paid</Button></TableCell>
             <TableCell>10/09/2023</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>01</TableCell>
             <TableCell>#12435267725252727</TableCell>
              <TableCell>Elizabeth Lopez</TableCell>
              <TableCell >#12435267725252727</TableCell>
              <TableCell >₹ 7,800</TableCell>
              <TableCell ><Button className='bg-green-200 h-6' >Paid</Button></TableCell>
             <TableCell>10/09/2023</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>01</TableCell>
             <TableCell>#12435267725252727</TableCell>
              <TableCell>Elizabeth Lopez</TableCell>
              <TableCell >#12435267725252727</TableCell>
              <TableCell >₹ 7,800</TableCell>
              <TableCell ><Button className='bg-green-200 h-6' >Paid</Button></TableCell>
             <TableCell>10/09/2023</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>01</TableCell>
             <TableCell>#12435267725252727</TableCell>
              <TableCell>Elizabeth Lopez</TableCell>
              <TableCell >#12435267725252727</TableCell>
              <TableCell >₹ 7,800</TableCell>
              <TableCell ><Button className='bg-green-200 h-6' >Paid</Button></TableCell>
             <TableCell>10/09/2023</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>01</TableCell>
             <TableCell>#12435267725252727</TableCell>
              <TableCell>Elizabeth Lopez</TableCell>
              <TableCell >#12435267725252727</TableCell>
              <TableCell >₹ 7,800</TableCell>
              <TableCell ><Button className='bg-green-200 h-6' >Paid</Button></TableCell>
             <TableCell>10/09/2023</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>01</TableCell>
             <TableCell>#12435267725252727</TableCell>
              <TableCell>Elizabeth Lopez</TableCell>
              <TableCell >#12435267725252727</TableCell>
              <TableCell >₹ 7,800</TableCell>
              <TableCell ><Button className='bg-green-200 h-6' >Paid</Button></TableCell>
             <TableCell>10/09/2023</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>01</TableCell>
             <TableCell>#12435267725252727</TableCell>
              <TableCell>Elizabeth Lopez</TableCell>
              <TableCell >#12435267725252727</TableCell>
              <TableCell >₹ 7,800</TableCell>
              <TableCell ><Button className='bg-green-200 h-6' >Paid</Button></TableCell>
             <TableCell>10/09/2023</TableCell>
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