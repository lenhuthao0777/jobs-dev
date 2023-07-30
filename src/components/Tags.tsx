import { FC, ReactNode } from 'react'
import { Star, Heart } from 'lucide-react'

interface TopProps {
  type: Array<number>
}

import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const variant = cva(`px-2 py-1 text-xs font-semibold border-2 rounded-3xl`, {
  variants: {
    variant: {
      1: `border-teal-300`,
      2: 'border-yellow-300',
      3: 'border-red-300',
    },
  },
})

type TagType = {
  type: number
  icon: ReactNode | null
  title: string
}

const Top: FC<TopProps> = ({ type }) => {
  /*
    1: Remote
    2: Star
    3: Like
  */

  const list: TagType[] = [
    {
      type: 1,
      icon: null,
      title: 'Remote',
    },
    {
      type: 2,
      icon: <Star className='w-4 h-4 mr-1' />,
      title: 'Company',
    },
    {
      type: 3,
      icon: <Heart className='w-4 h-4 mr-1' />,
      title: 'Like',
    },
  ]

  const list1: TagType[] = type.reduce((arr: TagType[], item: number) => {
    const result = list.find((a) => a.type === item)
    if (result) {
      arr.push(result)
    }
    return arr
  }, [])

  return (
    <>
      <div className='flex items-center space-x-1'>
        {list1.map((item: TagType) => (
          <Link
            href='/'
            key={item.title}
            className={cn(
              variant({ variant: item.type as number | any }),
              'px-2 py-1 text-xs font-semibold border-2 rounded-3xl flex items-center'
            )}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Top
