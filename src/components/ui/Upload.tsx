"use client";
import React, { FC, useState } from "react";
import { InputBase } from "./InputBase";
import FileModel from "@/models/file";
import { Image as ImageEmpty } from "lucide-react";
import Image from "next/image";
import LoadingComponent from "./Loading";
interface PageProps {
  onChange?: (file: any) => void;
  img?: any;
  userId: string;
}

const Upload: FC<PageProps> = ({ onChange, img, userId }) => {
  const [fileData, setFileData] = useState<any>(img);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUpload = async (data: any) => {
    setIsLoading(true);
    try {
      const res: any = await FileModel.upload(data);
      if (res) {
        await FileModel.create({
          name: res?.original_filename,
          url: res?.url,
          width: res?.width,
          height: res?.height,
          userId: userId,
        });
      }
      setFileData(res);
      onChange && onChange(res || img);
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeFile = (event: any) => {
    let data = event.target.files[0];
    const formData = new FormData();
    formData.append("file", data);
    formData.append("upload_preset", "jobsdev");
    formData.append("cloud_name", "dyg39hfua");
    data && handleUpload(formData);
  };


  return (
    <div className="flex flex-col w-full">
      <div className="w-full mb-2 overflow-hidden relative">
        {fileData ? (
          <Image
            src={fileData?.url}
            alt="img"
            width={fileData?.width}
            height={fileData?.height}
          />
        ) : (
          <div className="bg-slate-400 h-52 w-full flex items-center justify-center">
            <ImageEmpty className="w-40 h-40 text-white" />
          </div>
        )}
        <LoadingComponent isLoading={isLoading} />
      </div>
      <InputBase
        onChange={handleChangeFile}
        type="file"
        className="cursor-pointer"
      />
    </div>
  );
};

export default Upload;
