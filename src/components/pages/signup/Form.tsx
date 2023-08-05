"use client";
import React, { useEffect, useMemo } from "react";
import { Input } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import Auth from "@/models/auth";
import { useToast } from "@/hooks/use-toast";
import RadioGroup from "@/components/ui/RadioGroup";
import Role from "@/models/role";
import { TRole } from "@/types/globalType";
import { useRouter } from "next/navigation";

const Form = () => {
  const { toastSuccess, toastError } = useToast();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      roleId: "360371a5-5041-4dd0-a33c-9a499dea4f02",
    },
  });

  const { mutate: handleSignUp, isLoading } = useMutation({
    mutationFn: async (data: any) => await Auth.create(data),
    onSuccess(data: any) {
      if (data?.data) {
        toastSuccess(data?.message);
      } else {
        toastError(data?.message);
      }
    },
    onError() {
      toastError("Some thing went wrong, try again!");
    },
  });

  const { mutate: getRoles, data: roleData } = useMutation({
    mutationFn: async () => await Role.list(),
  });

  const handleForm = (data: any) => {
    handleSignUp(data);
  };

  const optionRoles = useMemo(() => {
    const result: TRole[] = roleData?.data.filter(
      (item: TRole) => item.name !== "admin"
    );
    const options: any = result?.map((item: TRole) => ({
      label: item.name.toUpperCase(),
      value: item.id,
    }));
    return options;
  }, [roleData]);

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div className="h-screen w-full">
      <form
        onSubmit={handleSubmit(handleForm)}
        className="bg-white rounded-lg shadow p-5 w-96 m-auto space-y-2"
      >
        <div className="flex flex-col">
          <span className="text-xs mb-1">Name</span>
          <Input name="name" register={register} errors={errors} />
        </div>

        <div className="flex flex-col">
          <span className="text-xs mb-1">Email</span>
          <Input name="email" register={register} errors={errors} />
        </div>

        <div className="flex flex-col">
          <span className="text-xs mb-1">Password</span>
          <Input
            type="password"
            name="password"
            register={register}
            errors={errors}
          />
        </div>

        <div>
          {/*<RadioGroup name='roleId' options={optionRoles} register={register} errors={errors}/>*/}
        </div>

        <Button isLoading={isLoading} type="submit" size="sm">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Form;
