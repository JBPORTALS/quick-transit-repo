"use client";

import type { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { easeIn, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@qt/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@qt/ui/form";
import ImageUploader from "@qt/ui/imagePlaceholder";
import { Input } from "@qt/ui/input";
import { HStack } from "@qt/ui/stack";

const steps = [
  {
    name: "Package Details",
    description: `Provide the package details.`,
    show: true,
    fields: [
      "name",
      "category",
      "courier",
      "description",
      "dimensions",
      "weight",
    ],
  },
  {
    name: "Package Images",
    // show: true,
    fields: ["image1", "image2", "image3"],
  },
  {
    name: "Select Time Slot",
    // show: true,
    fields: ["weight"],
  },
  {
    name: "Select Addresses",
    // show: true,
    fields: ["weight"],
  },
  {
    name: "Payment",
    fields: ["weight"],
  },
];

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {}

const Step = ({ ...props }: StepProps) => (
  <div
    {...props}
    className="group relative flex w-fit items-center gap-5 aria-hidden:grayscale"
  >
    <div
      className={
        "relative flex h-[6px] w-40 items-center gap-2 rounded-full bg-primary/20"
      }
    >
      <motion.div
        animate={{ width: props["aria-hidden"] ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: "anticipate" }}
        className="h-full rounded-full bg-primary shadow-sm shadow-primary/50"
      ></motion.div>
    </div>
    <span className="absolute top-5 text-nowrap text-sm group-aria-hidden:text-muted-foreground">
      {props["aria-label"]}
    </span>
  </div>
);

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const formSchema = z.object({
  name: z.string().min(2, "minimum 2 characters").max(50),
  category: z.string().min(2),
  courier: z.string().min(2),
  pacakgeDescription: z.string().min(2),
  dimensions: z.string().min(2),
  weight: z.string().min(2),
  date: z.date(),
  from: z.string(),
  to: z.string(),
  image1: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
  image2: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    )
    .optional(),
  image3: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    )
    .optional(),
});

type Inputs = z.infer<typeof formSchema>;

type FieldNames = keyof Inputs;

export default function NewRequest() {
  const [current, setCurrent] = useState(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      courier: "",
      date: new Date(),
      dimensions: "",
      from: "",
      pacakgeDescription: "",
      to: "",
      weight: "",
      image1: null,
    },
  });

  async function preCheck() {
    const fields = steps[current]?.fields;
    const isValid = await form.trigger(fields as FieldNames[], {
      shouldFocus: true,
    });

    if (!isValid) return false;
    else {
      setCurrent((current) => current + 1);
      return true;
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values);
  }

  return (
    <div className="flex h-fit min-h-full w-full flex-col items-center gap-8 p-10">
      <div className="flex w-fit gap-5 pb-12 pt-8">
        {steps.map((s, i) => (
          <Step key={s.name} aria-label={s.name} aria-hidden={i > current} />
        ))}
      </div>
      <Form {...form}>
        <form className="w-2/4 space-y-6 rounded-radius border bg-background p-10 shadow-sm dark:bg-secondary">
          {/* Step 1 */}
          {current === 0 && (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="AICTE Questions Papers" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pacakgeDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        className="h-20"
                        placeholder="This package contains ..."
                        {...field}
                      />
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
                name="courier"
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
              <HStack>
                <FormField
                  control={form.control}
                  name="dimensions"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{"Dimensions (.cm)"}</FormLabel>
                      <FormControl>
                        <Input placeholder="22x34x2" {...field} />
                      </FormControl>
                      <FormDescription>
                        {"Define (lxbxh) in approximate value"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{"Weight (.kg)"}</FormLabel>
                      <FormControl>
                        <Input placeholder="0.34" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </HStack>
              <HStack className="justify-end">
                <Button
                  size={"lg"}
                  type="button"
                  onClick={() => preCheck()}
                  className="w-1/3"
                >
                  Continue
                </Button>
              </HStack>
            </>
          )}
          {/* Step 2 */}
          {current === 1 && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="image1"
                  render={({ field }) => <ImageUploader {...field} />}
                />
                <FormField
                  control={form.control}
                  name="image2"
                  render={({ field }) => <ImageUploader {...field} />}
                />
                <FormField
                  control={form.control}
                  name="image3"
                  render={({ field }) => <ImageUploader {...field} />}
                />
              </div>
              <HStack className="justify-end">
                <Button
                  variant={"secondary"}
                  type="button"
                  size={"lg"}
                  onClick={() => setCurrent((current) => current - 1)}
                  className="w-1/3"
                >
                  Previous
                </Button>
                <Button
                  size={"lg"}
                  type="button"
                  onClick={() => preCheck()}
                  className="w-1/3"
                >
                  Continue
                </Button>
              </HStack>
            </>
          )}
          <pre>{JSON.stringify(form.watch(), null, 4)}</pre>
        </form>
      </Form>
    </div>
  );
}
