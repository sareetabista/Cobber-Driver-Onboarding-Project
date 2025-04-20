import type { FormValues } from "./form-provider";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { FileIcon, CheckCircleIcon } from "lucide-react";

interface FormDataViewerProps {
  data: FormValues;
}

export function FormDataViewer({ data }: FormDataViewerProps) {
  return (
    <Card>
      <CardHeader className="bg-primary/5">
        <div className="flex items-center gap-2">
          <CheckCircleIcon className="h-6 w-6 text-primary" />
          <CardTitle>Registration Submitted Successfully</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="personal">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="signature">Signature</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">
                  Full Name
                </h3>
                <p className="mt-1">{data.fullName}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">
                  ABN Number
                </h3>
                <p className="mt-1">{data.abnNumber}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">
                  Vehicle Name
                </h3>
                <p className="mt-1">{data.vehicleName}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">
                  Vehicle Number
                </h3>
                <p className="mt-1">{data.vehicleNumber}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">
                  Vehicle Model
                </h3>
                <p className="mt-1">{data.vehicleModel}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DocumentPreview
                title="Driver License"
                file={data.driverLicense}
              />
              <DocumentPreview
                title="Insurance Certificate"
                file={data.insuranceCertificate}
              />
              <DocumentPreview title="ABN Document" file={data.abnFile} />
            </div>
          </TabsContent>

          <TabsContent value="signature" className="p-4">
            <div className="flex flex-col items-center">
              <h3 className="font-medium text-sm text-muted-foreground mb-2">
                Your Signature
              </h3>
              {typeof data.signature === "string" ? (
                <div className="border p-4 rounded-md bg-white">
                  <img
                    src={data.signature || "/placeholder.svg"}
                    alt="Signature"
                    className="max-h-40"
                  />
                </div>
              ) : (
                <p>No signature provided</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

interface DocumentPreviewProps {
  title: string;
  file: File | string | undefined;
}

function DocumentPreview({ title, file }: DocumentPreviewProps) {
  const isFileObject = file instanceof File;
  const isFileString = typeof file === "string";

  return (
    <div className="border rounded-md p-4 flex flex-col items-center">
      <h3 className="font-medium text-sm mb-2">{title}</h3>

      {isFileObject && (
        <div className="flex flex-col items-center">
          <FileIcon className="h-10 w-10 text-primary mb-2" />
          <p className="text-sm truncate max-w-full">{file.name}</p>
        </div>
      )}

      {isFileString && (
        <div className="flex flex-col items-center">
          {file.startsWith("data:image") ? (
            <img
              src={file || "/placeholder.svg"}
              alt={title}
              className="h-20 object-contain mb-2"
            />
          ) : (
            <FileIcon className="h-10 w-10 text-primary mb-2" />
          )}
          <p className="text-sm">Uploaded file</p>
        </div>
      )}

      {!file && (
        <p className="text-sm text-muted-foreground">No file uploaded</p>
      )}
    </div>
  );
}
