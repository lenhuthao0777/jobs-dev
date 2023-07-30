'use client'
import { cn } from '@/lib/utils'
import React, { FC, ReactNode, useState } from 'react'
import Button from './Button'
import { textChangeRangeIsUnchanged } from 'typescript'

type IconAction = {
  content: string
  color: string
  bg: string
  action: () => void
}

interface ModalProps {
  mode?: 'MacOs' | 'Window'
  label?: string
  children?: ReactNode
}

const Modal: FC<ModalProps> = ({
  mode = 'MacOs',
  label = 'Open Modal',
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const iconAction: IconAction[] = [
    {
      content: 'x',
      color: '',
      bg: 'bg-red-500',
      action: () => {
        setIsOpen(!isOpen)
      },
    },
    {
      content: '-',
      color: '',
      bg: 'bg-yellow-500',
      action: () => {},
    },
    {
      content: '+',
      color: '',
      bg: 'bg-green-500',
      action: () => {},
    },
  ]

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{label}</Button>
      {isOpen ? (
        <div className='fixed top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,0.6)] flex items-center justify-center'>
          <div className='w-[400px] h-auto p-5 rounded-md bg-white shadow'>
            <div
              className={cn(
                `${mode === 'Window' ? 'justify-end' : ''}`,
                'flex items-center space-x-1'
              )}
            >
              {iconAction.map((item: IconAction) => (
                <p
                  key={item.content}
                  className={cn(
                    `${item.bg} ${item.color}`,
                    ' w-3 h-3 text-[10px] rounded-full text-center flex items-center justify-center font-semibold cursor-pointer'
                  )}
                  onClick={item.action}
                >
                  {item.content}
                </p>
              ))}
            </div>
            <div>{children}</div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Modal
