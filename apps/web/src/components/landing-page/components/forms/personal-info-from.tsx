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
import { Loader2 } from "lucide-react";

const personalInfoSchema = z.object({
  fullname: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  abn_number: z.string().min(1, "Abn Number is required"),
  vehicle_name: z.string().min(1, "Vehicle Name is required"),
  vehicle_number: z.string().min(1, "Vehicle Number is required"),
  vehicle_model: z.string().min(1, "Vehicle Model is required"),
});

interface props {
  changeStep: () => void;
}

export default function PersonalInfoForm({ changeStep }: props) {
  const form = useForm({
    resolver: zodResolver(personalInfoSchema),
  });

  const submitHandler = (data: any) => {
    console.log(data);
    changeStep();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Personal & Vehicle Details</h2>
      <Form {...form}>
        <form
          className=" space-y-3"
          onSubmit={form.handleSubmit(submitHandler)}
        >
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
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
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter your full name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="vehicle_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter vehicle name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vehicle_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter vehicle number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="vehicle_model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Model</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter vehicle model" {...field} />
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
                  <FormLabel>ABN Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter ABN number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-6 flex justify-end">
            <Button type="submit" className="bg-teal-500 hover:bg-teal-600">
              {false ? (
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
