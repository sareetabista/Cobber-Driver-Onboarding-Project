"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { FileCheck, User, Car } from "lucide-react";
import type { DriverData } from "./driver-onboarding";

type SubmissionSummaryProps = {
  driverData: DriverData;
};

export default function SubmissionSummary({
  driverData,
}: SubmissionSummaryProps) {
  const { personalInfo, vehicleInfo, documents } = driverData;

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not provided";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Application Summary
        </h2>
        <Button variant="outline" onClick={() => window.print()}>
          Print Summary
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {personalInfo && (
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <User className="h-6 w-6 text-teal-500" />
              <CardTitle className="text-xl">Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="text-sm text-gray-900">
                  {personalInfo.firstName} {personalInfo.lastName}
                </dd>

                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="text-sm text-gray-900">{personalInfo.email}</dd>

                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="text-sm text-gray-900">{personalInfo.phone}</dd>

                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="text-sm text-gray-900">
                  {personalInfo.address}, {personalInfo.city},{" "}
                  {personalInfo.state} {personalInfo.zipCode}
                </dd>

                <dt className="text-sm font-medium text-gray-500">
                  Date of Birth
                </dt>
                <dd className="text-sm text-gray-900">
                  {formatDate(personalInfo.dob)}
                </dd>
              </dl>
            </CardContent>
          </Card>
        )}

        {vehicleInfo && (
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Car className="h-6 w-6 text-teal-500" />
              <CardTitle className="text-xl">Vehicle Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                <dt className="text-sm font-medium text-gray-500">Vehicle</dt>
                <dd className="text-sm text-gray-900">
                  {vehicleInfo.year} {vehicleInfo.make} {vehicleInfo.model}
                </dd>

                <dt className="text-sm font-medium text-gray-500">Color</dt>
                <dd className="text-sm text-gray-900">{vehicleInfo.color}</dd>

                <dt className="text-sm font-medium text-gray-500">
                  License Plate
                </dt>
                <dd className="text-sm text-gray-900">
                  {vehicleInfo.licensePlate}
                </dd>

                <dt className="text-sm font-medium text-gray-500">Insurance</dt>
                <dd className="text-sm text-gray-900">
                  {vehicleInfo.insurance}
                </dd>

                <dt className="text-sm font-medium text-gray-500">
                  Registration
                </dt>
                <dd className="text-sm text-gray-900">
                  {vehicleInfo.registrationNumber}
                </dd>
              </dl>
            </CardContent>
          </Card>
        )}
      </div>

      {documents && (
        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <FileCheck className="h-6 w-6 text-teal-500" />
            <CardTitle className="text-xl">Documents Submitted</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Driver's License: {documents.driversLicense}</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Insurance Document: {documents.insuranceDoc}</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Background Check Consent:{" "}
                  {documents.backgroundCheck ? "Provided" : "Not provided"}
                </span>
              </li>
            </ul>

            <Separator className="my-4" />

            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Application Status
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      Your application has been submitted successfully and is
                      currently under review. You will be notified once the
                      verification process is complete.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
