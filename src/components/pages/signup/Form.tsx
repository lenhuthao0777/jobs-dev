'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { useForm } from 'react-hook-form';
import Button, { buttonVariants } from '@/components/ui/Button';
import { useMutation, useQuery } from '@tanstack/react-query';
import Auth from '@/models/Auth';
import { useToast } from '@/hooks/use-toast';
import Role from '@/models/Role';
import { TResponse, TRole } from '@/types/globalType';
import Link from 'next/link';
import ProfileModel from '@/models/Profile';
import { useRouter } from 'next/navigation';
import InputRadioGroup from '@/components/ui/InputRadioGroup';
import CompanyModel from '@/models/Company';

const Form = () => {
  const { toastSuccess, toastError } = useToast();

  const router = useRouter();

  const [typeAccount, setTypeAccount] = useState<string>(
    'bd36f652-1e3b-496d-8d1f-c7bc8ea6b8d1'
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      roleId: '',
    },
  });

  const { data: roleData } = useQuery<TResponse<TRole[]>>({
    queryKey: ['roles'],
    queryFn: () => Role.list(),
  });

  const { mutate: handleSignUp, isLoading } = useMutation({
    mutationFn: async (data: any) =>
      await Auth.register({ ...data, roleId: typeAccount }),
    async onSuccess(data: any) {
      if (data?.data) {
        toastSuccess(data?.message);

        const find = roleData?.data?.find(
          (item: TRole) => item.id === typeAccount
        );

        if (find && find?.type === 2) {
          await CompanyModel.create({
            firstName: data?.data?.firstName,
            lastName: data?.data?.lastName,
            userId: data?.data?.id,
          });
        } else {
          await ProfileModel.create({
            firstName: data?.data?.firstName,
            lastName: data?.data?.lastName,
            userId: data?.data?.id,
          });
        }

        router.push('/signin');
      } else {
        toastError(data?.message);
      }
    },
    onError() {
      toastError('Some thing went wrong, try again!');
    },
  });

  const handleForm = (data: any) => {
    handleSignUp(data);
  };

  const optionRoles: Array<any> = useMemo(() => {
    const result: any = roleData?.data?.filter(
      (item: TRole) => item.type !== 0
    );
    const options: any = result?.map((item: TRole) => ({
      label: item.name.toUpperCase(),
      value: item.id,
    }));

    return options;
  }, [roleData]);

  return (
    <div className='bg-white flex flex-col space-y-5 rounded-lg shadow p-5 w-[400px] mx-auto mt-40 '>
      <div className='text-zinc-900'>
        <h2 className='text-2xl font-semibold'>Sign Up</h2>
        <p className='text-[12px]'>
          By continuing, you are setting up a Reddit account and agree to our
          User Agreement and Privacy Policy.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleForm)} className='space-y-2'>
        <div className='flex flex-col'>
          <span className='text-xs mb-1'>First Name</span>
          <Input name='firstName' register={register} errors={errors} />
        </div>

        <div className='flex flex-col'>
          <span className='text-xs mb-1'>Last Name</span>
          <Input name='lastName' register={register} errors={errors} />
        </div>

        <div className='flex flex-col'>
          <span className='text-xs mb-1'>Email</span>
          <Input name='email' register={register} errors={errors} />
        </div>

        <div className='flex flex-col'>
          <span className='text-xs mb-1'>Password</span>
          <Input
            type='password'
            name='password'
            register={register}
            errors={errors}
          />
        </div>

        <div className='flex items-center pt-5'>
          <InputRadioGroup
            options={optionRoles}
            name='roleId'
            onChange={setTypeAccount}
          />
        </div>

        <div className='flex items-center justify-end'>
          <Button isLoading={isLoading} type='submit' size='sm'>
            Sign Up
          </Button>

          <Link
            href='signin'
            className={buttonVariants({
              variant: 'outline',
              size: 'sm',
              className: 'ml-2',
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
