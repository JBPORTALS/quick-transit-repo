"use client";

import { FormEventHandler, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Images, XCircleIcon, XIcon } from "lucide-react";
import { cn } from "node_modules/@qt/ui/lib/utils";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AspectRatio } from "@qt/ui/aspect-ratio";
import { Button } from "@qt/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFieldArray,
} from "@qt/ui/form";
import ImageUploader from "@qt/ui/imagePlaceholder";
import { Input } from "@qt/ui/input";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";
import { Textarea } from "@qt/ui/textarea";

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
    fields: ["images"],
  },
  {
    name: "Time Slot & Addresses",
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
  images: z
    .array(z.object({ file: z.any(), preview: z.string() }))
    .max(4, "Not more than 4 images")
    .nonempty({ message: "Package images are required" }),
  datetime: z.string().min(1, "Select a time"),
  pickUpAddress: z.string().optional(),
});

type Inputs = z.infer<typeof formSchema>;

type FieldNames = keyof Inputs;

export default function NewRequest() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();
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
      images: [],
    },
    mode: "onChange",
  });
  const { fields, append } = useFieldArray({
    name: "images",
    control: form.control,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values);
  }

  const onSubmitWithPrecheck: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const fields = steps[current]?.fields;
    const isValid = await form.trigger(fields as FieldNames[], {
      shouldFocus: true,
    });

    if (!isValid) return false;
    else {
      setCurrent((current) => current + 1);
      return true;
    }
  };

  return (
    <div className="flex h-fit min-h-full w-full flex-col items-center gap-5 p-10">
      <HStack className="w-full justify-between py-0">
        <div></div>
        <Text styles={"h4"}>New Request</Text>
        <Button
          onClick={() => router.back()}
          className="rounded-full"
          size={"icon"}
          variant={"outline"}
        >
          <XIcon className="text-foreground" />
        </Button>
      </HStack>
      <div className="flex w-fit gap-5 pb-12 pt-8">
        {steps.map((s, i) => (
          <Step key={s.name} aria-label={s.name} aria-hidden={i > current} />
        ))}
      </div>
      <Form {...form}>
        <form
          onSubmit={onSubmitWithPrecheck}
          className="w-2/4 space-y-6 rounded-radius border bg-card p-10 shadow-sm"
        >
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
                      <Textarea
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
            </>
          )}
          {/* Step 2 */}
          {current === 1 && (
            <>
              <FormField
                control={form.control}
                name="images"
                render={() => (
                  <FormItem>
                    <Dropzone
                      accept={{
                        "image/*": [".jpg", ".jpeg", ".png"],
                      }}
                      multiple={true}
                      maxSize={5000000}
                      maxFiles={3}
                      onDropAccepted={(acceptedFiles) => {
                        acceptedFiles.map((acceptedFile) => {
                          return append({
                            file: acceptedFile,
                            preview: URL.createObjectURL(acceptedFile),
                          });
                        });
                      }}
                    >
                      {({ getRootProps, getInputProps, acceptedFiles }) => (
                        <div
                          {...getRootProps({
                            className: cn(
                              "flex h-[480px] w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-input p-3 py-0",
                              form.formState.errors.images &&
                                "border-destructive",
                            ),
                          })}
                        >
                          <div className="flex h-full w-full items-center gap-x-3">
                            {fields.length > 0 ? (
                              <div className="grid w-full grid-cols-2 gap-3">
                                {fields.map((file) => {
                                  return (
                                    <AspectRatio
                                      ratio={16 / 12}
                                      className="relative border"
                                    >
                                      <Image
                                        src={file.preview}
                                        fill
                                        alt="Image"
                                        className="rounded-md object-cover"
                                      />
                                    </AspectRatio>
                                  );
                                })}
                              </div>
                            ) : (
                              <VStack className="h-full w-full items-center justify-center">
                                <Images className="h-10 w-10" />
                                <Text styles={"details"}>
                                  Drag & Drop Package Images or click to upload.
                                </Text>
                              </VStack>
                            )}
                            <FormControl>
                              <input {...getInputProps()} />
                            </FormControl>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {current === 2 && (
            <>
              <FormField
                control={form.control}
                name="datetime"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>{"Date & Time Of Delivery"}</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <VStack>
                <Text styles={"body"}>Pick-Up Address</Text>
              </VStack>
            </>
          )}

          <HStack className="justify-end">
            {current > 0 && (
              <Button
                variant={"secondary"}
                type="button"
                size={"lg"}
                onClick={() => setCurrent((current) => current - 1)}
                className="w-1/3"
              >
                Previous
              </Button>
            )}
            <Button size={"lg"} type="submit" className="w-1/3">
              Continue
            </Button>
          </HStack>
          {/* <pre>{JSON.stringify(form.watch(), null, 4)}</pre> */}
        </form>
      </Form>
    </div>
  );
}
