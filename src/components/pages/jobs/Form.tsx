"use client";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { modulesQuill } from "@/enums";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Quill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

const Form = () => {
  const [initialData, setInitialData] = useState();

  const { data } = useSession();

  const [content, setContent] = useState<string>();

  const { isLoading } = useMutation({});
  
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const handleForm = (data: any) => {};

  return (
    <div className="bg-white p-5 shadow rounded-lg">
      <form
        onSubmit={handleSubmit(handleForm)}
        className="flex flex-col space-y-5"
      >
        <div className="flex items-center">
          <span className="w-40 flex-shrink-0">Title</span>
          <Input name="title" register={register} errors={errors} />
        </div>

        <div className="flex items-center">
          <span className="w-40 flex-shrink-0">Location</span>
          <Input name="location" register={register} errors={errors} />
        </div>

        <div className="flex items-center">
          <span className="w-40 flex-shrink-0">Level</span>
          <Input name="level" register={register} errors={errors} />
        </div>

        <div className="flex items-center">
          <span className="w-40 flex-shrink-0">Type working</span>
          <Input name="typeWorking" register={register} errors={errors} />
        </div>

        <div className="flex items-center">
          <span className="w-40 flex-shrink-0">Salary range</span>
          <Input name="salaryRange" register={register} errors={errors} />
        </div>

        <div className="flex items-center">
          <span className="w-40 flex-shrink-0">Content</span>
          <Quill
            className="w-full"
            modules={modulesQuill}
            value={content}
            onChange={setContent}
          />
        </div>

        <div className="flex justify-end">
          <Button isLoading={isLoading} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
