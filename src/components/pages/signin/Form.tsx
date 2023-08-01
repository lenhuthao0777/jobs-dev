'use client'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import Button from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useForm } from 'react-hook-form'
function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({})

  const handleSignIn = async () => {
    await signIn('credentials', {
      email: 'hao@gmail.com',
      password: '123456',
    })
  }

  return (
    <div className='h-screen w-screen'>
      <form className='bg-white rounded-lg shadow w-96 p-5 m-auto mt-40'>
        <div className='flex flex-col'>
          <span className='text-xs font-semibold mb-1'>UserName</span>
          <Input name='email' register={register} errors={errors} />
        </div>
      </form>
      <Button onClick={handleSignIn}>test</Button>
    </div>
  )
}

export default Form
