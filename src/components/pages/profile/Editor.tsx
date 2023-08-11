"use client";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Upload from "@/components/ui/Upload";
import { useToast } from "@/hooks/use-toast";
import ProfileModel from "@/models/profile";
import { Profile } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";

const QuillReact = dynamic(async () => (await import("react-quill")).default, {
  ssr: false,
});

interface PageProps {
  profile: Profile;
  id: string;
  userId: string;
}

const Editor: FC<PageProps> = ({ profile, id, userId }) => {
  const { toastSuccess } = useToast();

  const [content, setContent] = useState<any>(profile.content);

  const [summary, setSummary] = useState<any>(profile.summary);

  const router = useRouter();

  const [images, setImages] = useState({
    avatar: profile.avatar,
    backgroundImage: profile.backgroundImage,
  });

  const { isLoading, mutate: handleCreateProfile } = useMutation({
    mutationFn: async (data: any) => ProfileModel.update("", data),
    onSuccess: (data: any) => {
      toastSuccess(data?.message);
      router.refresh();
      if (data?.status === 200) {
        router.push(`/profile/${userId}`);
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: profile.name,
      contact: profile.contact,
    },
  });

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
    ],
  };

  const handleForm = async (data: any) => {
    await handleCreateProfile({
      ...data,
      ...images,
      userId: userId,
      content,
      summary,
      id,
    });
  };

  return (
    <div className="bg-white p-5 rounded-lg w-full">
      <form onSubmit={handleSubmit(handleForm)} className="space-y-5">
        <div className="flex items-center">
          <span className="w-40 flex-shrink-0">Name</span>
          <Input name="name" register={register} errors={errors} />
        </div>

        <div className="flex items-center">
          <span className="w-40 flex-shrink-0">Contact</span>
          <Input name="contact" register={register} errors={errors} />
        </div>

        <div className="flex items-center">
          <span className="w-40 flex-shrink-0">Summary</span>
          <QuillReact
            theme="snow"
            className="w-full"
            modules={modules}
            value={summary}
            onChange={setSummary}
          />
        </div>

        <div className="flex items-center">
          <span className="w-40 flex-shrink-0">Content</span>
          <QuillReact
            theme="snow"
            className="w-full"
            modules={modules}
            value={content}
            onChange={setContent}
          />
        </div>

        <div className="flex items-center">
          <span className="w-40 flex-shrink-0">Avatar</span>
          <Upload
            userId={userId}
            img={profile?.avatar}
            onChange={(data: any) =>
              setImages((prev) => ({
                ...prev,
                avatar: data,
              }))
            }
          />
        </div>

        <div className="flex items-center">
          <span className="w-40 flex-shrink-0">Background Image</span>
          <Upload
            userId={userId}
            img={profile?.backgroundImage}
            onChange={(data: any) =>
              setImages((prev) => ({
                ...prev,
                backgroundImage: data,
              }))
            }
          />
        </div>

        <div className="w-full flex justify-end">
          <Button isLoading={isLoading} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Editor;
