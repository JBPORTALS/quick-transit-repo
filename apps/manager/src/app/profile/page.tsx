"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@qt/ui/avatar'
import { Button } from '@qt/ui/button'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@qt/ui/form"
import { Input } from "@qt/ui/input"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),

  phone_no: z.string(),
  gender: z.string()
})



export default function ProfilePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phone_no: "",

    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div >
      <div className='flex justify-center h-20 items-center pt-32  bg-gradient-to-b from-pink-300 to-white '>

        <Avatar className='w-28 h-28 absolute mr-80 ' >

          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-2 mt-2 rounded-lg  w-80  pl-16 py-3 bg-pink-100'>
          <h1 className='font-bold'>Tony Stark</h1>
          <span>tody@gmail.com</span>
          <Button className='rounded-3xl h-5 w-20'>Manager</Button>
        </div>
      </div>
      <div className='mt-28 flex justify-center  '>
        <div className='border w-5/12  rounded-md p-5 mb-20'>
          <h1 className='w-full  border-b-black border-b-2 pb-2'>Contact Information</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-3">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_no"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone No. </FormLabel>
                    <FormControl>
                      <Input placeholder="Phone No." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <br />
                    <FormControl className='w-full h-10 border rounded-md'>
                      <select  {...field}  >
                      <option value="" disabled selected>Select Gender</option>
                        <option value="volvo">Male</option>
                        <option value="saab">Female</option>
                        <option value="mercedes">Other</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=' flex justify-end'>
                <Button type="submit">Save Info </Button>
              </div>
            </form>
          </Form>

        </div>
      </div>
    </div>
  )
}