'use client'
import { FC } from 'react'
import { Radio } from 'antd';
import { cn } from '@/lib/utils'

export interface RadioGroupProps {
  register?: any
  errors?: any
  name: string
  options: {
    label: string,
    value: string | number
  }[]
}

const RadioGroup: FC<RadioGroupProps> = ({ options, errors, register, name }) => {
  return <div className='flex flex-col space-y-2'>
    <div className='flex items-center space-x-2'>
      {options?.map((item: any) => (
        <label htmlFor={item.name} key={item.value} className='flex items-center text-xs'>
          <input
            {...register(name)}
            type="radio"
            name={name}
            value="Burger"
            className="form-check-input"
            id="burger"
          />
          <span>{item?.label}</span>
        </label>
      ))}
    </div>
    {errors?.[name] ? <p className='text-xs, text-red-500'>{errors?.[name].message}</p> : null}
  </div>
}

export default RadioGroup
