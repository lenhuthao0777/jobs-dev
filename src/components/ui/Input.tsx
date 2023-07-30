import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: any
  errors?: any
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, register, errors, ...props }, ref) => {
    return (
      <div className='flex flex-col w-full'>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...register(props?.name)}
          {...props}
        />
        {errors?.[`${props.name}`] ? (
          <p className='text-[12px] text-red-500 pt-1 pl-1'>
            {errors[`${props?.name}`]?.message}
          </p>
        ) : null}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
