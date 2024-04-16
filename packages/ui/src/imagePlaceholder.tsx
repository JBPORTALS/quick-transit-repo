"use client";

import React, { useRef, useState } from "react";
import { Image } from "lucide-react";

const ImageUploader = () => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className="flex h-52 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300"
      onClick={handleDivClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {image ? (
        <img src={image} alt="Uploaded" className="max-h-full max-w-full" />
      ) : (
        <div className="flex flex-col items-center gap-7">
          <Image />
          <div>
            <h1 className="text-sm font-medium">
              Drop your image here or select{" "}
            </h1>
            <span className="flex justify-center text-sm font-medium text-muted-foreground">
              click to browse
            </span>
          </div>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default ImageUploader;
