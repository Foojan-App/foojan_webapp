"use client";

import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { App, Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useState } from "react";
import { uploadImageApi } from "@/services/ApiCollection";
import { errorMessage } from "@/services/errorMessage";
import MaskIcon from "@/components/MaskIcon";
import type { IconUploadProps } from "@/types/components";

const MAX_SIZE = 200 * 1024;
const ICON_SIZE = 68;
const SVG = "image/svg+xml";

const toIconPng = (file: Blob) =>
  new Promise<Blob>((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = ICON_SIZE;
      canvas.height = ICON_SIZE;
      canvas.getContext("2d")?.drawImage(image, 0, 0, ICON_SIZE, ICON_SIZE);
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("resize failed"))), "image/png");
      URL.revokeObjectURL(image.src);
    };
    image.onerror = reject;
    image.src = URL.createObjectURL(file);
  });

export default function IconUpload({ value, onChange, size = 17 }: IconUploadProps) {
  const { message } = App.useApp();
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    if (file.type === SVG && file.size > MAX_SIZE) {
      message.error("Icon must be smaller than 200 KB");
      return;
    }
    setUploading(true);
    try {
      const isSvg = file.type === SVG;
      const upload = isSvg ? file : await toIconPng(file);
      const { url } = await uploadImageApi(upload, isSvg ? file.name : file.name.replace(/\.[^.]+$/, ".png"));
      onChange?.(url);
    } catch (err) {
      message.error(errorMessage(err, "Could not upload the icon. Please try again."));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="grid size-10.5 shrink-0 place-items-center rounded-md bg-plum-950 text-white">
        {value ? (
          <MaskIcon src={value} size={size} />
        ) : (
          <span className="text-[10px] text-white/60">Icon</span>
        )}
      </span>
      <ImgCrop
        aspect={1}
        quality={1}
        beforeCrop={(file) => file.type !== SVG}
        showReset
        modalTitle="Adjust the icon"
        modalOk="Use this icon"
      >
        <Upload
          accept="image/svg+xml,image/png"
          showUploadList={false}
          customRequest={({ file }) => handleUpload(file as File)}
          disabled={uploading}
        >
          <Button icon={uploading ? <LoadingOutlined /> : <UploadOutlined />} disabled={uploading}>
            {value ? "Change icon" : "Upload icon"}
          </Button>
        </Upload>
      </ImgCrop>
    </div>
  );
}
