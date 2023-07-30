import React, { FC } from 'react'
import { Icons } from './ui/Icons'
import Image from 'next/image'

interface AvatarProps {
  src?: string
}

const Avatar: FC<AvatarProps> = ({ src }) => {
  return (
    <>
      {src ? (
        <Image src={src} alt='img' />
      ) : (
        <div className='h-8 w-8 text-xs bg-gray-500 rounded-full flex flex-shrink-0 items-center justify-center text-white font-semibold cursor-pointer'>
          Ab
        </div>
      )}
    </>
  )
}

export default Avatar
