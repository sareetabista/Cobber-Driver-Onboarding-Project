"use client";

import { useState } from "react";
import { Card } from "../../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import PersonalInfoForm from "./forms/personal-info-from";
import VehicleInfoForm from "./forms/document-upload";
import DocumentsForm from "./forms/signature-form";
import SubmissionSummary from "./submission-summary";

export type DriverData = {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    dob: string;
  } | null;
  vehicleInfo: {
    make: string;
    model: string;
    year: string;
    color: string;
    licensePlate: string;
    insurance: string;
    registrationNumber: string;
  } | null;
  documents: {
    driversLicense: string;
    insuranceDoc: string;
    backgroundCheck: boolean;
  } | null;
};

export default function DriverOnboarding() {
  const [activeTab, setActiveTab] = useState("form");
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full px-4"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Onboarding Form</TabsTrigger>
          <TabsTrigger value="summary">Submission Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="p-0">
          <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-6 text-white">
            <h2 className="text-2xl font-bold">Driver Registration</h2>
            <div className="mt-2 opacity-90">
              Complete the following steps to join our driver network
            </div>

            <div className="mt-6 flex justify-between">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white 
                      ${
                        currentStep > step
                          ? "bg-white text-emerald-600"
                          : currentStep === step
                            ? "bg-white/20"
                            : "bg-white/10"
                      }`}
                  >
                    {currentStep > step ? (
                      <div
                        onClick={() => {
                          setCurrentStep(step);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    ) : (
                      <span>{step}</span>
                    )}
                  </div>
                  <span className="mt-2 text-sm font-medium">
                    {step === 1
                      ? "Basic Information"
                      : step === 2
                        ? "Documents"
                        : "Agreement"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6">
            {currentStep === 1 && (
              <PersonalInfoForm changeStep={() => setCurrentStep(2)} />
            )}

            {currentStep === 2 && (
              <VehicleInfoForm changeStep={() => setCurrentStep(3)} />
            )}

            {currentStep === 3 && (
              <DocumentsForm changeStep={() => setCurrentStep(4)} />
            )}

            {currentStep === 4 && (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Application Submitted!
                </h3>
                <p className="mt-2 text-gray-600">
                  Thank you for completing all steps of the driver onboarding
                  process.
                </p>
                <button
                  onClick={() => setActiveTab("summary")}
                  className="mt-4 rounded-md bg-teal-500 px-4 py-2 text-white hover:bg-teal-600"
                >
                  View Submission Summary
                </button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="summary">
          <SubmissionSummary />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
