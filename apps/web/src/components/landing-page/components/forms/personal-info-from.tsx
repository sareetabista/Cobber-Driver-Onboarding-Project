import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  basicDetailsForm,
  getDriverDetails,
} from "../../../../api/services/app";
import { BaseAxiosErrorFormat } from "../../../../types";
import { toast } from "sonner";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { Calendar } from "../../../ui/calendar";
import { format, parseISO } from "date-fns";
import { cn } from "../../../../lib/utils";

const personalInfoSchema = z.object({
  fullname: z.string().min(3, "Full name is required"),
  phone: z.string().min(10, "Valid number must contain 10 numbers"),
  address: z.string().min(1, "Please enter address"),

  abn_number: z.string().min(1, "Abn Number is required"),
  vehicleDetails: z
    .object({
      name: z.string().min(1, "Vehicle Name is required"),
      number: z.string().min(1, "Vehicle Number is required"),
      model: z.string().min(1, "Vehicle Model is required"),
      type: z.string().min(1, "Vehicle Type is required"),
      license_type: z.string().min(1, "License Type is required"),
    })
    .strict(),
  fair_pay: z.coerce.number().optional(),
  hours_commitment: z.coerce.number().optional(),
  days_commitment: z.coerce.number().optional(),
  willing_to_move_large_goods: z.string().min(1, "Please select one option"),
  start_date: z.coerce.date(),
});

interface props {
  changeStep: () => void;
  currentStep: number;
}

export default function PersonalInfoForm({ changeStep, currentStep }: props) {
  const form = useForm({
    resolver: zodResolver(personalInfoSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: basicDetailsForm,
    onError: (error: BaseAxiosErrorFormat) => {
      error?.response?.data?.error?.map((error) => {
        toast.error(error);
      });
    },
    onSuccess: () => {
      changeStep();
    },
  });

  const submitHandler = (data: z.infer<typeof personalInfoSchema>) => {
    mutate({
      ...data,
      fair_pay: (data.fair_pay ?? "").toString(),
      days_commitment: (data.days_commitment ?? "").toString(),
      hours_commitment: (data?.hours_commitment ?? "").toString(),
      start_date: data.start_date.toISOString(),
    });
  };

  const { data: userDetails } = useQuery({
    queryKey: ["user-details"],
    queryFn: getDriverDetails,
  });

  useEffect(() => {
    if (userDetails && currentStep === 1) {
      form.reset({
        ...userDetails,
        willing_to_move_large_goods:
          "willing_to_move_large_goods" in userDetails
            ? userDetails?.willing_to_move_large_goods === true
              ? "yes"
              : "no"
            : undefined,
        vehicleDetails: {
          ...userDetails?.vehicleDetails,
          type: userDetails?.vehicleDetails?.type,
        },
        start_date: userDetails?.start_date
          ? parseISO(userDetails?.start_date)
          : undefined,
        fair_pay: userDetails?.fair_pay
          ? Number(userDetails?.fair_pay)
          : undefined,
        days_commitment: userDetails?.days_commitment
          ? Number(userDetails?.days_commitment)
          : undefined,
        hours_commitment: userDetails?.hours_commitment
          ? Number(userDetails?.hours_commitment)
          : undefined,
      });
    }
  }, [userDetails]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
      <Form {...form}>
        <form
          className=" grid grid-cols-2 gap-3"
          onSubmit={form.handleSubmit(submitHandler)}
        >
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone*</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter your phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="abn_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Please enter your Australian Business Number (ABN)*
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter ABN number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Suburb & City*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h2 className="text-xl col-span-2 font-semibold mt-2">
            Vehicle Details
          </h2>

          <FormField
            control={form.control}
            name="vehicleDetails.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter vehicle name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vehicleDetails.number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Number*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter vehicle number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vehicleDetails.model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Model*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter vehicle model" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vehicleDetails.type"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>
                  What sort of vehicle would you use for this purpose? *
                </FormLabel>
                <FormControl>
                  <Select
                    defaultValue={userDetails?.vehicleDetails?.type}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent className=" w-full">
                      <SelectGroup>
                        <SelectItem value="vehicle_with_trailer">
                          Vehicle with Trailer
                        </SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="ute">UTE</SelectItem>
                        <SelectItem value="van">Van</SelectItem>
                        <SelectItem value="truck">Truck</SelectItem>
                        <SelectItem value="station_wagon">
                          Station Wagon
                        </SelectItem>
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
            name="vehicleDetails.license_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Drivers License Type*</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={userDetails?.vehicleDetails?.license_type}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select License Type" />
                    </SelectTrigger>
                    <SelectContent className=" w-full">
                      <SelectGroup>
                        <SelectItem value={"australian"}>Australian</SelectItem>
                        <SelectItem value="international">
                          International
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h2 className="text-xl col-span-2 font-semibold mt-2">
            Service Commitment Overview
          </h2>

          <FormField
            control={form.control}
            name="fair_pay"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>
                  What do you think is a fair fee for an average delivery: 1-10
                  kms of travel for an item you can move door to door as a
                  single driver with a total time investment of less than 1
                  hour? (in AUD)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hours_commitment"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>
                  Based on the above, how many hours a day would you commit per
                  day?
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="days_commitment"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>
                  How many days a week do you think you would be willing to
                  commit to delivering with Cobber?
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="willing_to_move_large_goods"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>
                  Would you be willing to move large or bulky goods (an office
                  desk, cabinet, or fridge, etc.)?*
                </FormLabel>
                <FormControl>
                  <Select
                    defaultValue={
                      userDetails?.willing_to_move_large_goods ? "yes" : "no"
                    }
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className=" w-full">
                      <SelectGroup>
                        <SelectItem value={"yes"}>Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
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
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  When would you be ready to start Driving with Cobber?*
                </FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          " justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-6 col-span-2 flex justify-end">
            <Button
              disabled={isPending}
              type="submit"
              className="bg-green-600 hover:bg-green-700"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save & Continue"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
