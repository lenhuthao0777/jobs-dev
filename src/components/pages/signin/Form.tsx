'use client';
import React, { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Icons } from '@/components/ui/Icons';
import { useRouter } from 'next/navigation';

function Form() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toastSuccess, toastError } = useToast();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignIn = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const res = await signIn('credentials', { ...data, redirect: false });
      if (res?.error) {
        toastError('Email or Password invalid, try again!');
      } else {
        router.push(res?.url as string);
      }
    } catch (error) {
      toastError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForm = async (data: { email: string; password: string }) => {
    await handleSignIn(data);
  };

  const session = useSession();

  if (session.data) return null;

  return (
    <div className='bg-white flex flex-col rounded-lg shadow mx-auto w-[400px] max-lg:w-[300px] p-5 mt-40 space-y-5'>
      <div className='flex items-center justify-center'>
        <span className='text-xl font-extrabold'>Jobs</span>
        <Icons.logo className='h-40 w-40 max-lg:w-30 max-lg:w-30' />
      </div>

      <h2 className='text-2xl text-center font-semibold tracking-tight'>
        Welcome back!
      </h2>

      <p className='text-sm text-center w-full'>
        By continuing, you are setting up a Jobs Dev account and agree to our
        User Agreement and Privacy policy.
      </p>

      <p className='w-full border-b border-dashed border-slate-200'></p>

      <form onSubmit={handleSubmit(handleForm)} className='space-y-2'>
        <div className='flex flex-col'>
          <span className='text-xs font-semibold mb-1'>Email</span>
          <Input name='email' register={register} errors={errors} />
        </div>
        <div className='flex flex-col'>
          <span className='text-xs font-semibold mb-1'>Password</span>
          <Input
            type='password'
            name='password'
            register={register}
            errors={errors}
          />
        </div>

        <Button type='submit' isLoading={isLoading} className='mt-3 w-full'>
          Sign In
        </Button>
      </form>
      <p className='px-8 text-center text-sm text-zinc-700'>
        New to Jobs?{' '}
        <Link
          href={'/signup'}
          className='hover:text-zinc-800 text-sm underline underline-offset-4 font-semibold'
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Form;
