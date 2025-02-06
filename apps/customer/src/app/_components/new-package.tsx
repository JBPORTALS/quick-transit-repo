"use client";

import React, { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { isUndefined } from "lodash";
import { CalendarIcon, Circle, PlusIcon, RocketIcon } from "lucide-react";
import { z } from "zod";

import { cn } from "@qt/ui";
import { Button } from "@qt/ui/button";
import { Calendar } from "@qt/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  useForm,
} from "@qt/ui/form";
import { Input } from "@qt/ui/input";
import { Label } from "@qt/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@qt/ui/popover";
import { RadioGroup, RadioGroupItem } from "@qt/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@qt/ui/select";
import { Separator } from "@qt/ui/seperator";
import { HStack, VStack } from "@qt/ui/stack";
import { Text } from "@qt/ui/text";
import { Textarea } from "@qt/ui/textarea";
import { toast } from "@qt/ui/toast";

import { api } from "~/trpc/react";
import { AddressCardDialog } from "./add-address-form";

const steps = [
  {
    name: "Package Details",
    show: true,
    description: "Add package details",
    fields: [
      "title",
      "category",
      "courier",
      "description",
      "height",
      "width",
      "breadth",
      "delivery_date",
      "from_time",
      "to_time",
      "is_insurance_required",
      "weight",
    ],
  },
  {
    name: "Address Details",
    // show: true,
    fields: ["pick_up_address", "franchise_address", "delivery_address"],
  },
  {
    name: "Payment",
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

const timeSlotSchema = z
  .object(
    {
      from_time: z.string().min(1, "Required"),
      to_time: z.string().min(1, "Required"),
    },
    { required_error: "Required", invalid_type_error: "Invalid" },
  )
  .required()
  .superRefine(({ from_time, to_time }, ctx) => {
    if (!from_time || !to_time) return;

    const [fromHour, fromMinute] = from_time.split(":").map(Number);
    const [toHour, toMinute] = to_time.split(":").map(Number);

    if (
      isNaN(fromHour!) ||
      isNaN(fromMinute!) ||
      isNaN(toHour!) ||
      isNaN(toMinute!)
    ) {
      ctx.addIssue({
        path: ["to_time"],
        message: "Invalid time format",
        code: "invalid_type",
        expected: "string",
        received: "nan",
      });
      return;
    }

    const fromTotalMinutes = fromHour! * 60 + fromMinute!;
    const toTotalMinutes = toHour! * 60 + toMinute!;

    if (toTotalMinutes <= fromTotalMinutes) {
      ctx.addIssue({
        path: ["to_time"],
        message: "To time must be greater than From time",
        code: "custom",
      });
    }
  });

const packageFormShema = z
  .object({
    title: z.string().trim().min(1, "Required"),
    description: z.string().trim().min(1, "Required"),
    weight: z
      .number({ invalid_type_error: "Invalid" })
      .min(1, "Invalid")
      .max(10000, "Less than or equal to 10000"),
    height: z.number({ invalid_type_error: "Invalid" }).min(1, "Invalid"),
    width: z.number({ invalid_type_error: "Invalid" }).min(1, "Invalid"),
    breadth: z.number({ invalid_type_error: "Invalid" }).min(1, "Invalid"),
    courier: z.string().trim().min(1, "Required"),
    category: z.string().trim().min(1, "Required"),
    pick_up_address: z
      .string()
      .min(1, "Add new address Or Select existing one"),
    franchise_address: z
      .string()
      .min(1, "Add new address Or Select existing one"),
    delivery_address: z
      .string()
      .min(1, "Add new address Or Select existing one"),
    is_insurance_required: z.enum(["Yes", "No"], {
      required_error: "Required",
    }),
    delivery_date: z.date({ required_error: "Required" }),
  })
  .and(timeSlotSchema);

const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

type FieldNames = keyof z.infer<typeof packageFormShema>;

export function NewPackage() {
  const [current, setCurrent] = useState(0);

  const { data: categories } = api.category.getCategories.useQuery();

  const utils = api.useUtils();

  const billMutation = api.bills.createBill.useMutation({});

  const { data: couriers } = api.couriers.getCouriers.useQuery();

  const { data: pickUpAddresses } = api.address.getAllByType.useQuery({
    type: "pickup",
  });

  const { data: franchiseAddresses } = api.address.getAllByType.useQuery({
    type: "franchise",
  });

  const { data: deliveryAddresses } = api.address.getAllByType.useQuery({
    type: "delivery",
  });

  const firstDeliveryAddress = deliveryAddresses?.at(0);
  const firstPickUpAddress = pickUpAddresses?.at(0);
  const firstfranchiseUpAddress = franchiseAddresses?.at(0);

  const form = useForm({
    schema: packageFormShema,
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      is_insurance_required: "No",
      delivery_address: !isUndefined(firstDeliveryAddress)
        ? firstDeliveryAddress.id
        : "",
      pick_up_address: !isUndefined(firstPickUpAddress)
        ? firstPickUpAddress.id
        : "",
      franchise_address: !isUndefined(firstfranchiseUpAddress)
        ? firstfranchiseUpAddress.id
        : "",
    },
  });

  const formValues = form.getValues();

  const { data: bill_summary_detail, isLoading: is_bill_summury_loading } =
    api.bills.getSummaryDetails.useQuery(
      {
        weight: formValues.weight,
        insurance_required:
          formValues.is_insurance_required === "Yes" ? true : false,
      },
      {
        enabled: current === 2,
      },
    );

  const addPackage = api.packages.addPackage.useMutation({
    async onSuccess() {
      router.refresh();
      await utils.packages.getRecentPackages.invalidate();
      await utils.packages.getAllTrackingDetails.invalidate();
      router.replace("/dashboard");
      toast.success("Package requested successfully");
      form.reset();
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof packageFormShema>) {
    if (bill_summary_detail) {
      const generated_bill_id = await billMutation.mutateAsync({
        service_charge: bill_summary_detail.service_charge
          .toPrecision(2)
          .toString(),
        gst_charges: bill_summary_detail.gst.toPrecision(2).toString(),
        insurance_charge:
          bill_summary_detail.insurance_charge?.toPrecision(2).toString() ??
          "0",
      });
      if (generated_bill_id) {
        await addPackage.mutateAsync({
          title: values.title,
          description: values.description,
          weight: values.weight,
          category_id: values.category,
          courier_id: values.courier,
          breadth: values.breadth,
          width: values.width,
          height: values.height,
          delivery_date: new Date(values.delivery_date),
          from_time: values.from_time,
          to_time: values.to_time,
          destination_address_id: values.delivery_address,
          franchise_address_id: values.franchise_address,
          pick_up_address_id: values.pick_up_address,
          is_insurance_required:
            values.is_insurance_required == "Yes" ? true : false,
        });
      }
    }
  }

  const onSubmitWithPrecheck: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const fields = steps[current]?.fields;
    const isValid = await form.trigger(fields as FieldNames[], {
      shouldFocus: true,
    });

    if (current === 2) form.handleSubmit(onSubmit)(e);
    else if (current < 2 && !isValid) return false;
    else {
      setCurrent((current) => current + 1);
    }
  };

  return (
    <div className="w-full px-10">
      <div className="sm:text-center">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          New Package
        </h3>

        {/* <SheetDescription>{steps[current]?.description}</SheetDescription> */}
        <div className="mx-auto flex w-fit gap-5 pb-10 pt-3">
          {steps.map((s, i) => (
            <Step key={s.name} aria-label={s.name} aria-hidden={i > current} />
          ))}
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={onSubmitWithPrecheck}
          className="w-full space-y-6 px-3 py-4"
        >
          {current === 0 && (
            <>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <Label>Title</Label>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Label>Description</Label>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <HStack className="w-full">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Label>Weight</Label>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>in kilo grams</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormItem>
                  <Label>{"Dimensions (HxBxW in .cm)"}</Label>
                  <HStack className="items-start">
                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <HStack className="items-center">
                              <Input
                                type="number"
                                placeholder="H"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))
                                }
                              />
                              <span className="text-sm text-muted-foreground">
                                x
                              </span>
                            </HStack>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="breadth"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <HStack className="items-center">
                              <Input
                                type="number"
                                placeholder="B"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))
                                }
                              />
                              <span className="text-sm text-muted-foreground">
                                x
                              </span>
                            </HStack>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="width"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="W"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </HStack>
                </FormItem>
              </HStack>

              <HStack>
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Label>Category</Label>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          {...field}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Categories</SelectLabel>
                              {categories &&
                                categories.map((category) => (
                                  <SelectItem value={category.id}>
                                    <HStack className="items-center">
                                      <Circle className="size-4" />
                                      {category.name}
                                    </HStack>
                                  </SelectItem>
                                ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="courier"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Label>Courier Service</Label>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          {...field}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Courier Services</SelectLabel>
                              {couriers &&
                                couriers.map((courier) => (
                                  <SelectItem value={courier.id}>
                                    <HStack className="items-center">
                                      <RocketIcon className="size-4" />
                                      {courier.name}
                                    </HStack>
                                  </SelectItem>
                                ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </HStack>
              <HStack>
                <FormField
                  control={form.control}
                  name="delivery_date"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Date of Delivery</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[250px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="pointer-events-auto w-auto p-0"
                          align="start"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div style={{ cursor: "pointer" }}>
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="from_time"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Label>From Time</Label>
                      <FormControl>
                        <Input className="w-full" type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="to_time"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Label>To Time</Label>
                      <FormControl>
                        <Input className="w-full" type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="is_insurance_required"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Label>{"Insurance (upto 50,000)"}</Label>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          {...field}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={"Yes"}>Yes</SelectItem>
                            <SelectItem value={"No"}>No</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        Additional charges will apply
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </HStack>
            </>
          )}

          {current === 1 && (
            <>
              <FormField
                control={form.control}
                name="pick_up_address"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Label>{"Pickup Address"}</Label>
                    <FormDescription>
                      Where we have to pick up your package
                    </FormDescription>

                    <AddressCardDialog
                      title="New Pickup Address"
                      description="Where we have to pick up your package"
                      type="pickup"
                    >
                      <Button className="w-full" variant={"outline"}>
                        Add New <PlusIcon />
                      </Button>
                    </AddressCardDialog>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        {pickUpAddresses?.map(
                          ({ phone, street, pincode, id }) => (
                            <HStack
                              className={cn(
                                "items-center justify-between rounded-radius border bg-card p-5",
                                field.value === id &&
                                  "border-primary bg-primary/10",
                              )}
                            >
                              <VStack>
                                <Text>{phone}</Text>
                                <Text
                                  styles={"subtle"}
                                  className="text-muted-foreground"
                                >
                                  {street}
                                </Text>
                                <Text
                                  styles={"subtle"}
                                  className="text-muted-foreground"
                                >
                                  {pincode}
                                </Text>
                              </VStack>
                              <RadioGroupItem value={id} />
                            </HStack>
                          ),
                        )}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <FormField
                control={form.control}
                name="franchise_address"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Label>{"Franchise Address"}</Label>
                    <FormDescription>
                      Where we have to deliver your package
                    </FormDescription>
                    <AddressCardDialog
                      title="New Franchise Address"
                      description="Where we have to deliver your package"
                      type="franchise"
                    >
                      <Button variant={"outline"} className="w-full">
                        Add New <PlusIcon />
                      </Button>
                    </AddressCardDialog>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        {franchiseAddresses?.map(
                          ({ phone, street, pincode, id }) => (
                            <HStack
                              className={cn(
                                "items-center justify-between rounded-radius border bg-card p-5",
                                field.value === id &&
                                  "border-primary bg-primary/10",
                              )}
                            >
                              <VStack>
                                <Text>{phone}</Text>
                                <Text
                                  styles={"subtle"}
                                  className="text-muted-foreground"
                                >
                                  {street}
                                </Text>
                                <Text
                                  styles={"subtle"}
                                  className="text-muted-foreground"
                                >
                                  {pincode}
                                </Text>
                              </VStack>
                              <RadioGroupItem value={id} />
                            </HStack>
                          ),
                        )}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />

              <FormField
                control={form.control}
                name="delivery_address"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Label>{"Delivery Address"}</Label>
                    <FormDescription>
                      Where franchise has to deliver your package
                    </FormDescription>
                    <AddressCardDialog
                      title="New Delivery Address"
                      description="Where franchise has to deliver your package"
                      type="delivery"
                    >
                      <Button variant={"outline"} className="w-full">
                        Add New <PlusIcon />
                      </Button>
                    </AddressCardDialog>

                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        {deliveryAddresses?.map(
                          ({ phone, street, pincode, id }) => (
                            <HStack
                              className={cn(
                                "items-center justify-between rounded-radius border bg-card p-5",
                                field.value === id &&
                                  "border-primary bg-primary/10",
                              )}
                            >
                              <VStack>
                                <Text>{phone}</Text>
                                <Text
                                  styles={"subtle"}
                                  className="text-muted-foreground"
                                >
                                  {street}
                                </Text>
                                <Text
                                  styles={"subtle"}
                                  className="text-muted-foreground"
                                >
                                  {pincode}
                                </Text>
                              </VStack>
                              <RadioGroupItem value={id} />
                            </HStack>
                          ),
                        )}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {current === 2 && bill_summary_detail && (
            <>
              <HStack className="justify-between">
                <Text>Service Charge</Text>
                <Text>
                  {formatter.format(bill_summary_detail.service_charge)}
                </Text>
              </HStack>
              <HStack className="justify-between">
                <Text>GST Charge</Text>
                <Text>{formatter.format(bill_summary_detail.gst)}</Text>
              </HStack>
              {bill_summary_detail.insurance_charge && (
                <HStack className="justify-between">
                  <Text>Insurance Charge</Text>
                  <Text>
                    {formatter.format(bill_summary_detail.insurance_charge)}
                  </Text>
                </HStack>
              )}
              <Separator />
              <HStack className="justify-between">
                <Text>Total Amount</Text>
                <Text>{formatter.format(bill_summary_detail.total)}</Text>
              </HStack>
            </>
          )}
          <div className="flex items-center justify-end gap-3">
            {current > 0 && (
              <Button
                disabled={addPackage.isPending}
                variant={"outline"}
                type="button"
                size={"lg"}
                onClick={() => setCurrent((current) => current - 1)}
              >
                Previous
              </Button>
            )}
            <Button
              disabled={is_bill_summury_loading || addPackage.isPending}
              size={"lg"}
              isLoading={addPackage.isPending}
              type="submit"
            >
              {current === 2 ? "Create" : "Continue"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
