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
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getDriverDetails,
  uploadSignature,
} from "../../../../api/services/app";
import { data } from "./aggrement-terms";
import { Checkbox } from "../../../../components/ui/checkbox";
import { useEffect } from "react";

const documentsSchema = z.object({
  signature: z.union(
    [
      z
        .string({ message: "Signature is required" })
        .url({ message: "Image must be a valid URL" }),
      z.instanceof(File).refine((file) => file.size <= 3 * 1024 * 1024, {
        message: "Image must be less than 3MB",
      }),
    ],
    { message: "Signature is required" },
  ),
  terms_condition: z.boolean(),
});

type DocumentsFormProps = {
  changeStep: VoidFunction;
};

export default function DocumentsForm({ changeStep }: DocumentsFormProps) {
  const form = useForm({
    resolver: zodResolver(documentsSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: uploadSignature,
    onError: (error) => {},
    onSuccess: () => {
      changeStep();
    },
  });

  const handleFormSubmit = async (data: z.infer<typeof documentsSchema>) => {
    const formdata = new FormData();
    if (data?.signature instanceof File) {
      formdata.append("signature", data.signature);
      mutate(formdata);
    } else {
      changeStep();
    }
  };

  const { data: userDetails } = useQuery({
    queryKey: ["user-details"],
    queryFn: getDriverDetails,
  });

  useEffect(() => {
    if (userDetails) {
      form.reset({
        signature: userDetails?.signature,
      });
    }
  }, [userDetails]);

  return (
    <Form {...form}>
      <form
        className="space-y-3"
        onSubmit={form.handleSubmit(handleFormSubmit)}
      >
        <h3 className="mb-4 text-xl font-semibold text-gray-800">
          Terms and Conditions
        </h3>

        <div className="h-[380px] shadow rounded overflow-auto">
          <div
            dangerouslySetInnerHTML={{ __html: data }}
            className="  py-3 px-1"
          ></div>

          <FormField
            control={form.control}
            name="signature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Driver Signature</FormLabel>
                <FormControl>
                  <ImagePicker
                    defaultImage={userDetails?.signature}
                    name="driverLicense"
                    onImageChange={(file) => field.onChange(file)}
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
        </div>

        {form.formState?.errors?.signature && (
          <div className="text-red-600 text-sm">
            {form?.formState?.errors?.signature?.message}
          </div>
        )}

        <FormField
          control={form.control}
          name="terms_condition"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-2">
                <FormControl>
                  <Checkbox
                    onCheckedChange={(val) => {
                      field.onChange(val);
                    }}
                  />
                </FormControl>
                <FormLabel>
                  By continuing, you agree to our Terms and Conditions and
                  Privacy Policy.
                </FormLabel>
              </div>
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
