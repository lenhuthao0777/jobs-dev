'use state'
import Link from 'next/link'
import React, { FC, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SkillTagsProps {
  skills?: Array<string>
}
const SkillTags: FC<SkillTagsProps> = ({ skills = [] }) => {
  const [curr, setCurr] = useState(0)

  const next = () => {
    setCurr((curr) => (curr === skills.length - 1 ? 0 : curr + 1))
  }

  const prev = () => {
    setCurr((curr) => (curr === 0 ? skills.length - 1 : curr - 1))
  }
  return (
    <div className='overflow-hidden relative py-2'>
      <div className='flex items-center transition-transform ease-in-out duration-500'>
        <div
          className='flex items-center space-x-2 max-w-md overflow-x-auto pb-5'
          // style={{ transform: `translateX(-${curr * 2}%)` }}
        >
          {skills?.map((item) => (
            <span key={item}>
              <Link
                href='/'
                className='px-2 py-1 text-[10px] rounded-xl border border-gray-400'
              >
                {item}
              </Link>
            </span>
          ))}
        </div>
      </div>
      {/* <div className='flex items-center justify-between w-full inset-0 absolute top-0 left-0 py-5'>
        <span
          onClick={prev}
          className='flex items-center justify-center bg-transparent z-10 cursor-pointer'
        >
          <ChevronLeft size={20} />
        </span>
        <span
          onClick={next}
          className='flex items-center justify-center bg-transparent z-10 cursor-pointer'
        >
          <ChevronRight size={20} />
        </span>
      </div> */}
    </div>
  )
}

export default SkillTags
