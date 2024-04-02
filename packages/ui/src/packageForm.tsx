import React from 'react'
import { Label } from './label'
import { Input } from './input'
import { Hstack, VStack } from './stack'
import { Checkbox } from './checkbox'
import { Button } from './button'

export default function PackageForm() {
    return (

        <div className='grid grid-cols-2 w-full gap-5'>
            <VStack >
                <Label>Package Name</Label>
                <Input />
                <Label>Category</Label>
                <Input />
                <Label>Courier Service</Label>
                <Input />
                <Label>Package Description</Label>
                <Input />

            </VStack>
            <VStack >
                <Hstack>
                    <div>
                        <Label>Dimensions (lxbxh)</Label>
                        <Input />
                    </div>
                    <div>
                        <Label>Weight (Kg)</Label>
                        <Input />
                    </div>
                </Hstack>
                <h1 className='font-medium text-sm'>Time Slot</h1>
                <Label>Date</Label>
                <Input type='date' className='flex justify-center' />
                <Hstack>
                    <div>
                        <Label>From</Label>
                        <Input type='time' defaultValue={"10:10"} />
                    </div>
                    <div>
                        <Label>To</Label>
                        <Input type='time' defaultValue={"12:00"} />
                    </div>
                </Hstack>
                <div className="items-top flex space-x-2">
                    <Checkbox id="terms1" />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Insurance Required
                        </label>
                        <p className="text-sm text-muted-foreground">
                            Applies extra charges with total payment.
                        </p>
                    </div>
                </div>
                <Hstack className='justify-end'>
                    <Button variant={"outline"}>Cancel</Button>
                    <Button>Check Out</Button>
                </Hstack>

            </VStack>

        </div>
    )
}
