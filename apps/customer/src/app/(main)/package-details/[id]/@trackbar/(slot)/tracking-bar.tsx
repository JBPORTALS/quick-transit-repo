"use client";

import React from "react";
import { useParams } from "next/navigation";
import { isUndefined } from "lodash";
import { BikeIcon, Building, Star } from "lucide-react";
import moment from "moment";
import { z } from "zod";

import { RouterOutputs } from "@qt/api";
import { Button } from "@qt/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@qt/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@qt/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "@qt/ui/form";
import { Input } from "@qt/ui/input";
import { Separator } from "@qt/ui/seperator";
import { Textarea } from "@qt/ui/textarea";
import { UniversalTrackingBar } from "@qt/ui/universal-tracking-bar";

import { api } from "~/trpc/react";
import { TrackBarSkeleton } from "./skeleton";

// export const dynamic = "force-dynamic";

const reviewSchema = z.object({
  ratings: z.number().min(1),
  comment: z.string().optional(),
});

function AddReviewForPartnerDialog(props: {
  children: React.ReactNode;
  request_id: string;
  type: "partner" | "application";
  title: string;
  description: string;
}) {
  const [open, setOpen] = React.useState(false);
  const utils = api.useUtils();
  const { mutateAsync } = api.reviews.createReview.useMutation({
    onSuccess: () => {
      setOpen(false);
      utils.reviews.invalidate();
    },
  });

  const form = useForm({
    schema: reviewSchema,
    mode: "onChange",
    defaultValues: {
      ratings: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof reviewSchema>) {
    await mutateAsync({
      type: props.type,
      request_id: props.request_id,
      rating: values.ratings,
      comment: values.comment,
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="ratings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Ratings out of 5"}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        form.setValue("ratings", parseInt(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Comment (optional)"}</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                isLoading={form.formState.isSubmitting}
                size={"lg"}
                type="submit"
              >
                Add
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function Reviews({
  trackingDetails,
}: {
  trackingDetails: Exclude<
    RouterOutputs["packages"]["getTrackingDetails"],
    undefined
  >;
}) {
  const { data: partnerReviewDetails } = api.reviews.getReviewsByType.useQuery(
    {
      request_id: trackingDetails.request.id,
      type: "partner",
    },
    { enabled: trackingDetails.request.current_status === "delivered" },
  );

  const { data: applicationReviewDetails } =
    api.reviews.getReviewsByType.useQuery(
      {
        request_id: trackingDetails.request.id,
        type: "application",
      },
      { enabled: trackingDetails.request.current_status === "delivered" },
    );
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Reviews</CardTitle>
        <CardDescription>
          Help us improve! Leave a review of your delivery experience on the app
          today!
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isUndefined(partnerReviewDetails) ? (
          <AddReviewForPartnerDialog
            title="Feedback for Your Delivery Partner"
            description="Rate your delivery experience. Your feedback matters!"
            type="partner"
            request_id={trackingDetails.request.id}
          >
            <Button size={"lg"} variant={"outline"}>
              Add Review For Partner <BikeIcon />
            </Button>
          </AddReviewForPartnerDialog>
        ) : (
          <Card className="shadow-none">
            <CardHeader className="p-3 pb-1">
              <CardTitle className="text-base">
                You rated pick-up partner
              </CardTitle>
              <CardDescription>
                <span className="flex w-fit items-center gap-2 rounded-sm border border-amber-600/50 bg-amber-500/15 px-2 py-1 text-sm">
                  <Star className="size-4 text-amber-500" />{" "}
                  {partnerReviewDetails.rating} Stars
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3">
              <p className="text-sm">{partnerReviewDetails.comment}</p>
            </CardContent>
            <CardFooter className="flex justify-end p-3">
              <span className="text-xs text-muted-foreground">
                {moment(partnerReviewDetails.review_date).fromNow()}
              </span>
            </CardFooter>
          </Card>
        )}
        <Separator />
        {isUndefined(applicationReviewDetails) ? (
          <AddReviewForPartnerDialog
            title="Feedback for Company"
            description="Rate your service experience. Your feedback matters!"
            type="application"
            request_id={trackingDetails.request.id}
          >
            <Button size={"lg"} variant={"outline"}>
              Add Review For Company
              <Building className="text-base" />
            </Button>
          </AddReviewForPartnerDialog>
        ) : (
          <Card className="shadow-none">
            <CardHeader className="p-3 pb-1">
              <CardTitle className="text-base">You rated company</CardTitle>
              <CardDescription>
                <span className="flex w-fit items-center gap-2 rounded-sm border border-amber-600/50 bg-amber-500/15 px-2 py-1 text-sm">
                  <Star className="size-4 text-amber-500" />{" "}
                  {applicationReviewDetails.rating} Stars
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3">
              <p className="text-sm">{applicationReviewDetails.comment}</p>
            </CardContent>
            <CardFooter className="flex justify-end p-3">
              <span className="text-xs text-muted-foreground">
                {moment(applicationReviewDetails.review_date).fromNow()}
              </span>
            </CardFooter>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

export function TrackingBar({
  initialData,
}: {
  initialData: Exclude<
    RouterOutputs["packages"]["getTrackingDetails"],
    undefined
  >;
}) {
  const params = useParams();
  const package_id = params.id as string;
  const { data: trackingDetails } = api.packages.getTrackingDetails.useQuery(
    { package_id },
    { initialData },
  );

  if (isUndefined(trackingDetails))
    return <div>Unable to get tracking details</div>;

  return (
    <div className="sticky top-20 col-span-3 w-full">
      <div className="flex w-full flex-col gap-4">
        <UniversalTrackingBar packageDetails={trackingDetails} />
        {trackingDetails.request.current_status === "delivered" && (
          <Reviews trackingDetails={trackingDetails} />
        )}
      </div>
    </div>
  );
}
