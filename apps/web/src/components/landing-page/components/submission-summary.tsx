import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { FileCheck, User, Car, Signature, Blocks } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getDriverDetails } from "../../../api/services/app";
import CheckIcon from "../../../assets/check-icon";
import { format } from "date-fns";

export const vehicleTypeMapper = {
  vehicle_with_trailer: "Vehicle with Trailer",
  suv: "SUV",
  ute: "UTE",
  van: "Van",
  truck: "Truck",
  station_wagon: "Station Wagon",
} as const;

export default function SubmissinSummary() {
  const { data: userDetails } = useQuery({
    queryKey: ["user-details"],
    queryFn: getDriverDetails,
  });

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Application Summary
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="h-fit">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <User className="h-6 w-6 text-green-600" />
            <CardTitle className="text-xl">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className=" font-medium text-gray-500">Name</div>
              <div className=" text-gray-900">{userDetails?.fullname}</div>

              <div className=" font-medium text-gray-500">Email</div>
              <div className=" text-gray-900">{userDetails?.email}</div>

              <dt className=" font-medium text-gray-500">Phone</dt>
              <dd className=" text-gray-900">{userDetails?.phone}</dd>

              <dt className=" font-medium text-gray-500">Address</dt>
              <dd className=" text-gray-900">{userDetails?.address}</dd>

              <dt className=" font-medium text-gray-500">ABN Number</dt>
              <dd className=" text-gray-900">{userDetails?.abn_number}</dd>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Car className="h-6 w-6 text-green-600" />
            <CardTitle className="text-xl">Vehicle Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
              <dt className=" font-medium text-gray-500">Name</dt>
              <dd className=" text-gray-900">
                {userDetails?.vehicleDetails?.name}
              </dd>

              <dt className=" font-medium text-gray-500">License Number</dt>
              <dd className=" text-gray-900">
                {userDetails?.vehicleDetails?.number}
              </dd>

              <dt className=" font-medium text-gray-500">Model</dt>
              <dd className=" text-gray-900">
                {userDetails?.vehicleDetails?.model}
              </dd>

              <dt className=" font-medium text-gray-500">Vehicle Type</dt>
              <dd className=" text-gray-900">
                {
                  vehicleTypeMapper[
                    userDetails?.vehicleDetails
                      ?.type as keyof typeof vehicleTypeMapper
                  ]
                }
              </dd>

              <dt className=" font-medium text-gray-500">License Type</dt>
              <dd className=" capitalize text-gray-900">
                {userDetails?.vehicleDetails?.license_type}
              </dd>
            </dl>
          </CardContent>
        </Card>

        <Card className=" md:col-span-2 h-fit">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Blocks className="h-6 w-6 text-green-600" />
            <CardTitle className="text-xl">
              Service Commitment Section
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className=" font-medium text-gray-500">
                Expected Fair Pay
              </div>
              <div className=" text-gray-900">${userDetails?.fair_pay}</div>

              <div className=" font-medium text-gray-500">
                Per Day Commitment
              </div>
              <div className=" text-gray-900">
                {userDetails?.hours_commitment} Hours
              </div>

              <dt className=" font-medium text-gray-500">
                Per Week Commitment
              </dt>
              <dd className=" text-gray-900">
                {userDetails?.days_commitment} Days
              </dd>

              <dt className=" font-medium text-gray-500">
                Willing To Move Large Objects
              </dt>
              <dd className=" text-gray-900">
                {userDetails?.willing_to_move_large_goods ? "Yes" : "No"}
              </dd>

              <dt className=" font-medium text-gray-500">
                Expected Start Date
              </dt>
              <dd className=" text-gray-900">
                {userDetails?.start_date &&
                  format(userDetails?.start_date, "yyyy-MM-dd")}
              </dd>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <FileCheck className="h-6 w-6 text-green-600" />
          <CardTitle className="text-xl">Documents Submitted</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-5">
            {[
              { label: "Driver's License", value: userDetails?.license },
              { label: "ABN File", value: userDetails?.abn_file },
              {
                label: "Insurance Certificate",
                value: userDetails?.insurance_certificate,
              },
            ].map((item) => (
              <li className="flex items-center gap-2">
                <div className="w-full">
                  <div className="flex items-center gap-1 mb-1">
                    <CheckIcon />
                    {item.label}:
                  </div>
                  <div className="border w-full">
                    <img
                      className="w-full h-80 object-cover"
                      src={item?.value}
                      alt=""
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Signature className="h-6 w-6 text-green-600" />
          <CardTitle className="text-xl">Signature</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="w-full">
              <div className="flex items-center gap-1 mb-1">
                <CheckIcon />
                Signature:
              </div>
              <div className="border w-full">
                <img
                  className="w-full h-80 object-cover"
                  src={userDetails?.signature}
                  alt=""
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {userDetails?.status === "completed" && (
        <>
          <Separator className="my-4" />
          <Card>
            <CardContent>
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
                    <h3 className=" font-medium text-green-800">
                      Application Status
                    </h3>
                    <div className="mt-2  text-green-700">
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
        </>
      )}
    </div>
  );
}
