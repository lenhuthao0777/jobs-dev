'use client'
import React, {useState} from 'react'
import {signIn} from 'next-auth/react'
import Button from '@/components/ui/Button'
import {Input} from '@/components/ui/Input'
import {useForm} from 'react-hook-form'

function Form() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleSignIn = async (data: any) => {
    // await signIn('credentials', {
    //   ...data
    // })
    console.log(data)
  }

  return (
    <div className='h-screen full'>
      <form onSubmit={handleSubmit(handleSignIn)}
            className='bg-white rounded-lg shadow w-96 p-5 m-auto mt-40 space-y-2'>
        <div className='flex flex-col'>
          <span className='text-xs font-semibold mb-1'>Email</span>
          <Input name='email' register={register} errors={errors}/>
        </div>
        <div className='flex flex-col'>
          <span className='text-xs font-semibold mb-1'>Password</span>
          <Input name='password' register={register} errors={errors}/>
        </div>
        <Button type='submit' className='mt-3'>test</Button>
      </form>
    </div>
  )
}

export default Form
