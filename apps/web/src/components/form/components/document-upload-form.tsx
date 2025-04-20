import { useFormContext } from "react-hook-form";
import type { FormValues } from "./form-provider";
import ImagePicker from "../../landing-page/components/forms/file-upload";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../ui/form";

// Remove the interface and update the component to use useFormContext
export function DocumentUploadForm() {
  const { control, setValue } = useFormContext<FormValues>();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Document Upload</h2>

      <FormField
        control={control}
        name="driverLicense"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Driver License</FormLabel>
            <FormControl>
              {/* <FileUpload
                                value={field.value}
                                onChange={(file) => setValue("driverLicense", file, { shouldValidate: true })}
                                accept="image/*,.pdf"
                                predefinedLink={typeof field.value === "string" ? field.value : undefined}
                            /> */}
              <ImagePicker
                name="driverLicense"
                onImageChange={(file) =>
                  setValue("driverLicense", file, { shouldValidate: true })
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="insuranceCertificate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Insurance Certificate</FormLabel>
            <FormControl>
              {/* <FileUpload
                                value={field.value}
                                onChange={(file) => setValue("insuranceCertificate", file, { shouldValidate: true })}
                                accept="image/*,.pdf"
                                predefinedLink={typeof field.value === "string" ? field.value : undefined}
                            /> */}
              <ImagePicker
                name="insuranceCertificate"
                onImageChange={(file) =>
                  setValue("insuranceCertificate", file, {
                    shouldValidate: true,
                  })
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="abnFile"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ABN Document</FormLabel>
            <FormControl>
              {/* <FileUpload
                                value={field.value}
                                onChange={(file) => setValue("abnFile", file, { shouldValidate: true })}
                                accept="image/*,.pdf"
                                predefinedLink={typeof field.value === "string" ? field.value : undefined}
                            /> */}
              <ImagePicker
                name="abnFile"
                onImageChange={(file) =>
                  setValue("abnFile", file, { shouldValidate: true })
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
