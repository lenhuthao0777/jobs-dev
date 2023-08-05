'use client'
import React, { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Button from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useForm } from 'react-hook-form'
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

function Form() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toastSuccess, toastError } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleSignIn = async (data: { email: string, password: string }) => {
    setIsLoading(true)
    try {
      await signIn('credentials', data)
      toastSuccess('Sign In success!')
    } catch ( error ) {
      toastError('Email or Password invalid, try again!')
    } finally {
      setIsLoading(false)
    }
  }

  const handleForm = async (data: { email: string, password: string }) => {
    await handleSignIn(data)
  }

  const session = useSession()

  if (session.data) return null


  return (
    <div className='h-screen w-full'>
      <form onSubmit={handleSubmit(handleForm)}
            className='bg-white rounded-lg shadow w-96 p-5 m-auto mt-40 space-y-2'>
        <div className='flex flex-col'>
          <span className='text-xs font-semibold mb-1'>Email</span>
          <Input name='email' register={register} errors={errors}/>
        </div>
        <div className='flex flex-col'>
          <span className='text-xs font-semibold mb-1'>Password</span>
          <Input name='password' register={register} errors={errors}/>
        </div>
        <Button type='submit' isLoading={isLoading} className='mt-3'>Sign In</Button>
      </form>
    </div>
  )
}

export default Form
