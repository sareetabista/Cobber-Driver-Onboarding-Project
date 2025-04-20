import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../../../ui/button";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import ImagePicker from "./file-upload";

const documentsSchema = z.object({
  signature: z.union([
    z.string().url({ message: "Image must be a valid URL" }),
    z.instanceof(File).refine((file) => file.size <= 3 * 1024 * 1024, {
      message: "Image must be less than 3MB",
    }),
  ]),
});

type DocumentsFormProps = {
  changeStep: VoidFunction;
};

export default function DocumentsForm({ changeStep }: DocumentsFormProps) {
  const form = useForm({
    resolver: zodResolver(documentsSchema),
  });

  const handleFormSubmit = async (data: any) => {
    console.log(data, "data");
    changeStep();
  };

  return (
    <Form {...form}>
      <form
        className="space-y-3"
        onSubmit={form.handleSubmit(handleFormSubmit)}
      >
        <h3 className="mb-4 text-xl font-semibold text-gray-800">Documents</h3>

        <FormField
          control={form.control}
          name="signature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Driver License</FormLabel>
              <FormControl>
                <ImagePicker
                  name="driverLicense"
                  onImageChange={(file) => field.onChange(file)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
  );
}
