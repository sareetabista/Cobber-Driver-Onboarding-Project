import { useState } from "react";
import { useForm, FormProvider as RHFFormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { PersonalDetailsForm } from "./personal-details-form";
import { DocumentUploadForm } from "./document-upload-form";
import { SignatureForm } from "./signature-form";
import { FormDataViewer } from "./form-data-provider";
import { FormStepper } from "./form-stepper";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import { Loader2 } from "lucide-react";

// Define the form schema with Zod
const formSchema = z.object({
  // Phase 1: Personal and Vehicle Details
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  vehicleName: z.string().min(2, "Vehicle name is required"),
  vehicleNumber: z.string().min(2, "Vehicle number is required"),
  vehicleModel: z.string().min(2, "Vehicle model is required"),
  abnNumber: z.string().min(11, "ABN must be at least 11 digits"),

  // Phase 2: Document Uploads
  driverLicense: z
    .any()
    .refine((val) => val?.length > 0 || typeof val === "string", {
      message: "Driver license is required",
    }),
  insuranceCertificate: z
    .any()
    .refine((val) => val?.length > 0 || typeof val === "string", {
      message: "Insurance certificate is required",
    }),
  abnFile: z.any().refine((val) => val?.length > 0 || typeof val === "string", {
    message: "ABN file is required",
  }),

  // Phase 3: Signature
  signature: z
    .any()
    .refine((val) => val?.length > 0 || typeof val === "string", {
      message: "Signature is required",
    }),
});

export type FormValues = z.infer<typeof formSchema>;

const FORM_STEPS = [
  "Personal & Vehicle Details",
  "Document Upload",
  "Signature",
];

// Dummy API functions for each step
const submitPersonalDetails = async (data: Partial<FormValues>) => {
  // Simulate API call
  console.log("Submitting personal details:", data);
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log("Personal details submitted successfully");
      resolve();
    }, 1500);
  });
};

const submitDocuments = async (data: Partial<FormValues>) => {
  // Simulate API call
  console.log("Submitting documents:", data);
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log("Documents submitted successfully");
      resolve();
    }, 1500);
  });
};

const submitSignature = async (data: FormValues) => {
  // Simulate API call
  console.log("Submitting signature and finalizing form:", data);
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log("Form submitted successfully");
      resolve();
    }, 1500);
  });
};

export function FormProvider() {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      vehicleName: "",
      vehicleNumber: "",
      vehicleModel: "",
      abnNumber: "",
      driverLicense: undefined,
      insuranceCertificate: undefined,
      abnFile: undefined,
      signature: undefined,
    },
    mode: "onChange",
  });

  const handleSubmitPhase1 = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Extract only the data needed for this phase
      const phase1Data = {
        fullName: data.fullName,
        vehicleName: data.vehicleName,
        vehicleNumber: data.vehicleNumber,
        vehicleModel: data.vehicleModel,
        abnNumber: data.abnNumber,
      };

      await submitPersonalDetails(phase1Data);
      setCurrentPhase(2);
    } catch (error) {
      console.error("Error submitting personal details:", error);
      // Handle error (could add toast notification here)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitPhase2 = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Extract only the data needed for this phase
      const phase2Data = {
        driverLicense: data.driverLicense,
        insuranceCertificate: data.insuranceCertificate,
        abnFile: data.abnFile,
      };

      await submitDocuments(phase2Data);
      setCurrentPhase(3);
    } catch (error) {
      console.error("Error submitting documents:", error);
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitPhase3 = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await submitSignature(data);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting signature:", error);
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  const prevPhase = () => {
    if (currentPhase > 1) {
      setCurrentPhase(currentPhase - 1);
    }
  };

  const resetForm = () => {
    methods.reset();
    setCurrentPhase(1);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto">
        <FormDataViewer data={methods.getValues()} />
        <div className="mt-6 flex justify-center">
          <Button onClick={resetForm}>Start New Form</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-4 md:p-6">
        <FormStepper steps={FORM_STEPS} currentStep={currentPhase} />

        <RHFFormProvider {...methods}>
          {currentPhase === 1 && (
            <form onSubmit={methods.handleSubmit(handleSubmitPhase1)}>
              <PersonalDetailsForm />
              <div className="flex justify-between mt-6">
                <div></div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit & Continue"
                  )}
                </Button>
              </div>
            </form>
          )}

          {currentPhase === 2 && (
            <form onSubmit={methods.handleSubmit(handleSubmitPhase2)}>
              <DocumentUploadForm />
              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevPhase}
                  disabled={isSubmitting}
                >
                  Previous
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit & Continue"
                  )}
                </Button>
              </div>
            </form>
          )}

          {currentPhase === 3 && (
            <form onSubmit={methods.handleSubmit(handleSubmitPhase3)}>
              <SignatureForm />
              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevPhase}
                  disabled={isSubmitting}
                >
                  Previous
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          )}
        </RHFFormProvider>
      </Card>
    </div>
  );
}
