import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@qt/ui/table"
import { EllipsisVertical, Star } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@qt/ui/dropdown-menu"
import Link from 'next/link';


export default function Pickuppartner() {
    return (
        <div  >
            <div className='flex justify-between p-5'>
                <div className='flex gap-5 '>
                    <img 
                    src="data:image/jpeg;base64,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"
                     className='border max-h-40 max-w-60 rounded-lg '
                      />
                     

                 
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-bold text-md'>jhon doe</h1>
                        <span>jhondoe@gmail.com</span>
                        <span>9916078095</span>
                        <span className='flex border rounded-xl justify-center gap-1 p-1 bg-slate-200 border-slate-400'>
                            <Star color="#94A3B8" size={19} />
                            <Star color="#94A3B8" size={19} />
                            <Star color="#94A3B8" size={19} />
                            <Star color="#94A3B8" size={19} />
                            <Star color="#94A3B8" size={19} />
                        </span>
                    </div>



                </div>
                <div className='flex gap-5'>
                    <div className='border-l p-3 flex flex-col gap-2'>
                        <h1 className='font-bold'>Legal documents</h1>
                        <span className='font-semibold'>ID </span>
                        <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnGJCXeYEztNTzyZYDROiXs8gR-phaIojGsWVMnjcNJzHnhwDmXK5PDNAaqfW5GJdKC20&usqp=CAU"
                         className='border max-h-32 max-w-32 rounded-lg' />
                           <span className='font-semibold'>DL </span>
                           <img 
                        src="https://media.istockphoto.com/id/1073597286/vector/driver-license-with-male-photo-identification-or-id-card-template-vector-illustration.jpg?s=612x612&w=0&k=20&c=WkW7yo2wPw9HEfLAqyXqiDMX4Apditfd-bDuf8ENXcU="
                         className='border max-h-32 max-w-32  rounded-lg' />
                    </div>
                    <div className='h-20 '>
                        <DropdownMenu>

                            <DropdownMenuTrigger> <div className='border rounded-sm h-10 p-2'><EllipsisVertical size={20} color="#000000" /> </div></DropdownMenuTrigger>

                            <DropdownMenuContent className='mx-5'>
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Remove Partner</DropdownMenuItem>
                                <DropdownMenuItem>Edit Partner</DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                </div>
            </div>
            <div className='p-3'>
                <h1 className='font-bold text-lg'>Assigned Packages</h1>
                <span className='text-muted-foreground'>Packages that are assigned by you for delivery</span>
            </div>
            <div className='m-5'>
                <Table className='border-collapse border border-gray-300 w-full divide-x-0 p-4'>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Slno.</TableHead>
                            <TableHead>Request Id</TableHead>
                            <TableHead >Package</TableHead>
                            <TableHead >Dimension</TableHead>
                            <TableHead >Weight</TableHead>
                            <TableHead >Requested On</TableHead>
                            <TableHead >Average rating</TableHead>


                        </TableRow></TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>01</TableCell>
                            <Link href={"/pickUp-partner/partnerDetails/orders"}><TableCell>#a832873826r37</TableCell></Link>
                            <TableCell>Package1</TableCell>
                            <TableCell >23x45x10</TableCell>
                            <TableCell >20kg</TableCell>
                            <TableCell >yesterday</TableCell>
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
                            <TableCell>Package1</TableCell>
                            <TableCell >23x45x10</TableCell>
                            <TableCell >20kg</TableCell>
                            <TableCell >yesterday</TableCell>
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
                            <TableCell>Package1</TableCell>
                            <TableCell >23x45x10</TableCell>
                            <TableCell >20kg</TableCell>
                            <TableCell >yesterday</TableCell>
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
                            <TableCell>Package1</TableCell>
                            <TableCell >23x45x10</TableCell>
                            <TableCell >20kg</TableCell>
                            <TableCell >yesterday</TableCell>
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
                            <TableCell>Package1</TableCell>
                            <TableCell >23x45x10</TableCell>
                            <TableCell >20kg</TableCell>
                            <TableCell >yesterday</TableCell>
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
                            <TableCell>Package1</TableCell>
                            <TableCell >23x45x10</TableCell>
                            <TableCell >20kg</TableCell>
                            <TableCell >yesterday</TableCell>
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
                            <TableCell>Package1</TableCell>
                            <TableCell >23x45x10</TableCell>
                            <TableCell >20kg</TableCell>
                            <TableCell >yesterday</TableCell>
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
        </div>

    )
}