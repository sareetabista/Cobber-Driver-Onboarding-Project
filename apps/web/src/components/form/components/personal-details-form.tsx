import { useFormContext } from "react-hook-form";
import type { FormValues } from "./form-provider";
import { Input } from "../../ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../ui/form";

export function PersonalDetailsForm() {
  const { control } = useFormContext<FormValues>();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Personal & Vehicle Details</h2>

      <FormField
        control={control}
        name="fullName"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="vehicleName"
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
          control={control}
          name="vehicleNumber"
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
          control={control}
          name="vehicleModel"
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
          control={control}
          name="abnNumber"
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
    </div>
  );
}
