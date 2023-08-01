import Post from '@/components/pages/home/Post'
import { useSession } from 'next-auth/react'

export default function Home() {
  // const { data: session, status } = useSession()

  // console.log(session)

  return (
    <div className='flex'>
      <div className='py-6 flex-1'>
        <Post />
      </div>

      <div className='w-96 my-6 ml-5 p-5 rounded-lg border border-gray-200 bg-white'>
        222
      </div>
    </div>
  )
}
