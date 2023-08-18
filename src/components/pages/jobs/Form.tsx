"use client";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import InputSelect from "@/components/ui/InputSelect";
import { modulesQuill } from "@/enums";
import SkillModel from "@/models/skill";
import { TOptions } from "@/types/globalType";
import { Skill } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const Quill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

const Form = () => {
  const [initialData, setInitialData] = useState({});

  const { data } = useSession();

  const [content, setContent] = useState<string>();

  const [skillTags, setSkillTags] = useState();

  const { isLoading } = useMutation({});

  const { data: skills, mutate: getSkills } = useMutation({
    mutationFn: async () => await SkillModel.list(),
  });

  useEffect(() => {
    getSkills();
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const handleForm = (data: any) => {};

  const skillOptions: Array<TOptions> = useMemo(() => {
    return skills?.data
      ? skills.data.map((item: Skill) => ({
          label: item.name,
          value: item.id,
        }))
      : [];
  }, [skills]);

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

        <div className="flex items-center">
          <span className="w-40 flex-shrink-0">Skill</span>
          <InputSelect options={skillOptions} onChange={setSkillTags} placeholder="Select skill"/>
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
