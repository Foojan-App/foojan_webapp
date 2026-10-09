"use client";

import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { App, Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import NextImage from "next/image";
import { useState } from "react";
import { uploadImageApi } from "@/services/ApiCollection";
import { errorMessage } from "@/services/errorMessage";
import type { ImageUploadProps } from "@/types/components";

const resize = (file: Blob, width: number) =>
  new Promise<Blob>((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const scale = Math.min(1, width / image.width);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);
      canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("resize failed"))), "image/jpeg", 0.88);
      URL.revokeObjectURL(image.src);
    };
    image.onerror = reject;
    image.src = URL.createObjectURL(file);
  });

export default function ImageUpload({
  value,
  onChange,
  aspect = 4 / 3,
  outputWidth,
  round = false,
  freeShape = false,
}: ImageUploadProps) {
  const { message } = App.useApp();
  const [uploading, setUploading] = useState(false);
  const [cropAspect, setCropAspect] = useState(aspect);

  const matchPhotoShape = (file: File) =>
    new Promise<boolean>((resolve) => {
      const image = new Image();
      image.onload = () => {
        setCropAspect(image.width / image.height);
        URL.revokeObjectURL(image.src);
        resolve(true);
      };
      image.onerror = () => resolve(true);
      image.src = URL.createObjectURL(file);
    });

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const resized = await resize(file, outputWidth);
      const { url } = await uploadImageApi(resized, file.name.replace(/\.[^.]+$/, ".jpg"));
      onChange?.(url);
      message.success("Photo uploaded. Click Save to put it on the website.");
    } catch (err) {
      message.error(errorMessage(err, "Could not upload the photo. Please try again."));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-end gap-5">
      <div
        className={`relative grid place-items-center overflow-hidden border border-[#ECE6F0] bg-[#F3E6F7] ${round ? "w-24 rounded-full" : freeShape ? "w-56 rounded-lg" : "w-40 rounded-lg"}`}
        style={{ aspectRatio: aspect }}
      >
        {value ? (
          <NextImage
            src={value}
            alt="Current photo"
            fill
            sizes={round ? "96px" : "224px"}
            className={freeShape ? "object-contain" : "object-cover"}
          />
        ) : (
          <span className="px-2 text-center text-[12px] text-[#687080]">No photo yet</span>
        )}
      </div>
      <ImgCrop
        aspect={freeShape ? cropAspect : aspect}
        aspectSlider={freeShape}
        beforeCrop={freeShape ? matchPhotoShape : undefined}
        cropShape={round ? "round" : "rect"}
        rotationSlider
        showReset
        modalTitle="Adjust the photo"
        modalOk="Use this photo"
      >
        <Upload
          accept="image/*"
          showUploadList={false}
          customRequest={({ file }) => handleUpload(file as File)}
          disabled={uploading}
        >
          <Button icon={uploading ? <LoadingOutlined /> : <UploadOutlined />} disabled={uploading}>
            {value ? "Change photo" : "Upload photo"}
          </Button>
        </Upload>
      </ImgCrop>
    </div>
  );
}
