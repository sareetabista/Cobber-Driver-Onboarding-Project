"use client";

import { useEffect, useState } from "react";

type props = {
  name: string;
  defaultImage?: string;
  onImageChange: (image: string | File) => void;
};

const ImagePicker = ({ defaultImage, name, onImageChange }: props) => {
  const [image, setImage] = useState<File | string | null>();
  const [isDragging, setIsDragging] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      onImageChange(file);
    }
  };

  useEffect(() => {
    if (defaultImage) {
      setImage(defaultImage);
      onImageChange(defaultImage);
    }
  }, [defaultImage]);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setImage(reader.result as string);
          };
          reader.readAsDataURL(file);
          onImageChange(file);
        }
      }}
      className={`flex flex-col items-start justify-center  overflow-hidden  w-full  gap-3 bg-yellow-50 rounded-lg border border-yellow-500 border-dashed ${isDragging ? "!border-brand-primary" : ""}`}
    >
      <label className=" block w-full h-full" htmlFor={name}>
        {image ? (
          <div className=" h-80 border border-red-300">
            <img
              src={
                typeof image === "string" ? image : URL.createObjectURL(image)
              }
              alt={name}
              className=" w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="flex px-6 py-12 flex-col items-center gap-2">
            {/* <GalleryImportIcon className="size-6" /> */}
            <div className="text-cool-gray-600">
              <span className="text-brand-primary underline cursor-pointer inline">
                Click to upload
              </span>{" "}
              or drag and drop
            </div>
            <p className="text-sm text-cool-gray-600 text-center">
              Only png, jpg and jpeg files are supported (max 3 MB)
            </p>
          </div>
        )}
      </label>
      <input
        accept=".png,.jpg,.jpeg"
        id={name}
        type="file"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};

export default ImagePicker;
