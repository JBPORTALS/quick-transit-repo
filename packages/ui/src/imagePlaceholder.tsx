"use client";

import React, { useRef, useState } from "react";
import { Image } from "lucide-react";
import {
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";

const ImageUploader = ({
  ...props
}: Omit<ControllerRenderProps, "ref" | "onChange">) => {
  const [image, setImage] = useState<string | null>(props.value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
        }
      };
    }
  };

  // const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   const file = e.dataTransfer.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       if (typeof reader.result === "string") {
  //         setImage(reader.result);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  // };

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <FormItem className="w-full">
      <FormLabel>{"Picture 3 (optional)"}</FormLabel>
      <FormControl>
        <div
          className="flex h-52 w-full items-center justify-center rounded-lg border-2 border-dashed border-border"
          onClick={handleDivClick}
          // onDrop={handleDrop}
          // onDragOver={handleDragOver}
        >
          {props.value ? (
            <img
              src={props.value}
              alt="Uploaded"
              className="max-h-full max-w-full"
            />
          ) : (
            <div className="flex flex-col items-center gap-7">
              <Image />
              <div>
                {/* <h1 className="text-sm font-medium">
                  Drop your image here or select
                </h1> */}
                <span className="flex justify-center text-sm font-medium text-muted-foreground">
                  click to browse
                </span>
              </div>
            </div>
          )}
          <Input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            {...props}
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default ImageUploader;
