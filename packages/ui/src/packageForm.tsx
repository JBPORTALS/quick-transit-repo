import React from 'react'
import { Label } from './label'
import { Input } from './input'
import { HStack, VStack } from './stack'
import { Checkbox } from './checkbox'
import { Button } from './button'
import {  z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@qt/ui/form"


const formSchema = z.object({
    package_name: z.string().min(2).max(50),
    category: z.string().min(2).max(50),
    courier_service: z.string().min(2).max(50),
    package_description: z.string().min(2).max(50),
    dimensions: z.string().min(2).max(50),
    weight: z.string().min(2).max(50),
})

export default function PackageForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            package_name: "",
            category: "",
            courier_service: "",
            package_description: "",
            dimensions: "",
            weight: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className='grid grid-cols-2 w-full gap-5'>
                    <div >
                        <FormField
                            control={form.control}
                            name="package_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Package Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="courier_service"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Courier Service</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="package_description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Package Description</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <VStack >
                        <HStack>
                            <div>
                                <FormField
                                    control={form.control}
                                    name="dimensions"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Dimensions (lxbxh)</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name="weight"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Weight (Kg)</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </HStack>
                        <h1 className='font-medium text-sm '>Time Slot</h1>
                        <Label>Date</Label>
                        <Input type='date' className='flex justify-center' />
                        <HStack>
                            <div>
                                <Label>From</Label>
                                <Input type='time' defaultValue={"10:10"} />
                            </div>
                            <div>
                                <Label>To</Label>
                                <Input type='time' defaultValue={"12:00"} />
                            </div>
                        </HStack>
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
                    </VStack>
                </div>
                <HStack className='justify-end'>
                    <Button variant={"outline"} type='button'>Cancel</Button>
                    <Button type='submit'>Check Out</Button>
                </HStack>
            </form>
        </Form >
    )
}
