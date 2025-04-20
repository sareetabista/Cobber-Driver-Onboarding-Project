import { useState } from "react";
import { useForm, FormProvider as RHFFormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { PersonalDetailsForm } from "./components/personal-details-form";
import { DocumentUploadForm } from "./components/document-upload-form";
import { SignatureForm } from "./components/signature-form";
import { FormDataViewer } from "./components/form-data-provider";
import { FormStepper } from "./components/form-stepper";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

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

const RegistrationForm = () => {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    setIsSubmitted(true);
  };

  const nextPhase = () => {
    if (currentPhase < 3) {
      setCurrentPhase(currentPhase + 1);
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
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Vehicle Registration Form
      </h1>
      <div className="max-w-3xl mx-auto">
        <Card className="p-6">
          <FormStepper steps={FORM_STEPS} currentStep={currentPhase} />

          <RHFFormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {currentPhase === 1 && <PersonalDetailsForm />}
              {currentPhase === 2 && <DocumentUploadForm />}
              {currentPhase === 3 && <SignatureForm />}

              <div className="flex justify-between mt-6">
                {currentPhase > 1 ? (
                  <Button type="button" variant="outline" onClick={prevPhase}>
                    Previous
                  </Button>
                ) : (
                  <div></div>
                )}

                {currentPhase < 3 ? (
                  <Button
                    type="button"
                    onClick={nextPhase}
                    disabled={
                      currentPhase === 1 &&
                      (!methods.watch("fullName") ||
                        !methods.watch("vehicleName") ||
                        !methods.watch("vehicleNumber") ||
                        !methods.watch("vehicleModel") ||
                        !methods.watch("abnNumber"))
                    }
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit">Submit</Button>
                )}
              </div>
            </form>
          </RHFFormProvider>
        </Card>
      </div>
    </main>
  );
};

export default RegistrationForm;
