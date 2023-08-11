"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import Button, { buttonVariants } from "@/components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import Auth from "@/models/auth";
import { useToast } from "@/hooks/use-toast";
import RadioGroup from "@/components/ui/RadioGroup";
import Role from "@/models/role";
import { TRole } from "@/types/globalType";
import Link from "next/link";
import ProfileModel from "@/models/profile";
import { Radio } from "antd";
import { useRouter } from "next/navigation";

const Form = () => {
  const { toastSuccess, toastError } = useToast();

  const router = useRouter();

  const [typeAccount, setTypeAccount] = useState<string>(
    "360371a5-5041-4dd0-a33c-9a499dea4f02"
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      roleId: '',
    },
  });

  const { mutate: handleSignUp, isLoading } = useMutation({
    mutationFn: async (data: any) =>
      await Auth.create({ ...data, roleId: typeAccount }),
    async onSuccess(data: any) {
      if (data?.data) {
        toastSuccess(data?.message);
        await ProfileModel.create({
          name: data?.data?.name,
          userId: data?.data?.id,
        });
        router.push("/signin");
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
      (item: TRole) => item.type === 2
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
    <div className="bg-white flex flex-col space-y-5 rounded-lg shadow p-5 w-[400px] mx-auto mt-40 ">
      <div className="text-zinc-900">
        <h2 className="text-2xl font-semibold">Sign Up</h2>
        <p className="text-[12px]">
          By continuing, you are setting up a Reddit account and agree to our
          User Agreement and Privacy Policy.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleForm)} className="space-y-2">
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
          <Radio.Group
            options={optionRoles}
            onChange={(e: any) => setTypeAccount(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-end">
          <Button isLoading={isLoading} type="submit" size="sm">
            Sign Up
          </Button>

          <Link
            href="signin"
            className={buttonVariants({
              variant: "outline",
              size: "sm",
              className: "ml-2",
            })}
          >
            Back to Login Page
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Form;
