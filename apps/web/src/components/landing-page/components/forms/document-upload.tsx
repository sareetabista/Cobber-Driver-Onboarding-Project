import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import ImagePicker from "./file-upload";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getDriverDetails,
  uploadDocuments,
} from "../../../../api/services/app";
import { useEffect } from "react";

const vehicleInfoSchema = z.object({
  abn_file: z.union([
    z.string().url({ message: "Image must be a valid URL" }),
    z.instanceof(File).refine((file) => file.size <= 3 * 1024 * 1024, {
      message: "Image must be less than 3MB",
    }),
  ]),
  insurance_certificate: z.union([
    z.string().url({ message: "Image must be a valid URL" }),
    z.instanceof(File).refine((file) => file.size <= 3 * 1024 * 1024, {
      message: "Image must be less than 3MB",
    }),
  ]),
  license: z.union([
    z.string().url({ message: "Image must be a valid URL" }),
    z.instanceof(File).refine((file) => file.size <= 3 * 1024 * 1024, {
      message: "Image must be less than 3MB",
    }),
  ]),
});

type VehicleInfoFormProps = {
  changeStep: () => void;
};

export default function VehicleInfoForm({ changeStep }: VehicleInfoFormProps) {
  const form = useForm({
    resolver: zodResolver(vehicleInfoSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: uploadDocuments,
    onSuccess: () => {
      changeStep();
    },
  });

  const handleFormSubmit = async (data: z.infer<typeof vehicleInfoSchema>) => {
    const formdata = new FormData();
    data?.abn_file instanceof File &&
      formdata.append("abn_file", data?.abn_file);
    data?.insurance_certificate instanceof File &&
      formdata.append("insurance_certificate", data?.insurance_certificate);
    data?.license instanceof File && formdata.append("license", data?.license);

    mutate(formdata);
  };

  const { data: userDetails } = useQuery({
    queryKey: ["user-details"],
    queryFn: getDriverDetails,
  });

  useEffect(() => {
    if (userDetails) {
      form.reset({
        insurance_certificate: userDetails?.insurance_certificate,
        license: userDetails?.license,
        abn_file: userDetails?.abn_file,
      });
    }
  }, [userDetails]);

  return (
    <Form {...form}>
      <form
        className="space-y-3"
        onSubmit={form.handleSubmit(handleFormSubmit)}
      >
        <h3 className="mb-4 text-xl font-semibold text-gray-800">Documents</h3>

        <FormField
          control={form.control}
          name="license"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Driver License</FormLabel>
              <FormControl>
                <ImagePicker
                  defaultImage={userDetails?.license}
                  name="license"
                  onImageChange={(file) => field.onChange(file)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="insurance_certificate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Insurance Certificate</FormLabel>
              <FormControl>
                <ImagePicker
                  defaultImage={userDetails?.insurance_certificate}
                  name="insurance_certificate"
                  onImageChange={(file) => field.onChange(file)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="abn_file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ABN Document</FormLabel>
              <FormControl>
                <ImagePicker
                  defaultImage={userDetails?.abn_file}
                  name="abn_file"
                  onImageChange={(file) => field.onChange(file)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-6 flex justify-end">
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
  );
}
