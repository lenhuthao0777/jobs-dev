'use client';
import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { PenIcon, PlusIcon, ArrowUpRightSquare } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

//
import { TProfile } from '@/types/globalType';
import ProfileModel from '@/models/Profile';
import CompanyModel from '@/models/Company';
import Button from '@/components/ui/Button';

interface PageProps {
  id: string;
}

const Profile: FC<PageProps> = ({ id }) => {
  const pathName = usePathname();

  const isCompany = pathName.includes('company');

  const [initialProfileData, setInitialProfileData] = useState<TProfile>({
    id: '',
    firstName: '',
    lastName: '',
    headLine: '',
    education: '',
    industry: '',
    region: '',
    city: '',
    summary: null,
    avatar: null,
    backgroundImage: null,
    contact: null,
    content: null,
    createdAt: '',
    updatedAt: '',
    userId: id,
  });

  useQuery({
    queryKey: ['profile', id],
    queryFn: () => {
      if (isCompany) {
        return CompanyModel.getByAnything(id);
      } else {
        return ProfileModel.getByAnything(id);
      }
    },
    onSuccess(res) {
      setInitialProfileData(res.data);
    },
  });

  return (
    <div className='relative'>
      <div className='mt-2 bg-white rounded-lg'>
        <div className='h-[280px]'>
          <div
            className='w-full h-[200px] bg-cover bg-center bg-no-repeat object-cover rounded-t-lg relative shadow'
            style={{
              backgroundImage: `url(${initialProfileData?.backgroundImage?.url})`,
            }}
          >
            <div className='absolute top-1/2 left-5 z-[4]'>
              {initialProfileData?.avatar ? (
                <Image
                  src={initialProfileData?.avatar?.url as string}
                  width={initialProfileData?.avatar?.width}
                  height={initialProfileData?.avatar?.height}
                  alt='avatar'
                  className='w-40 h-40 rounded-full border object-cover'
                />
              ) : (
                <div className='w-40 h-40 bg-white rounded-full shadow flex items-center justify-center'>
                  <h2>Name</h2>
                </div>
              )}
            </div>
            <div className='cursor-pointer absolute right-2 top-2'>
              <Link href={`edit/${id}`}>
                <PenIcon className='w-6 h-6 text-gray-700' />
              </Link>
            </div>
          </div>
        </div>

        <div className='relative p-5 space-y-1'>
          <h2 className='text-3xl font-extrabold'>
            {initialProfileData?.lastName} {initialProfileData?.firstName}
          </h2>
          <p className='text-base font-semibold max-lg:text-sm'>
            {initialProfileData?.headLine}
          </p>
          <p className='flex items-center space-x-1 text-gray-500 text-sm'>
            <span>{initialProfileData?.industry}</span>
            <span>. {initialProfileData?.city}</span>
            <span>. {initialProfileData?.region}</span>
          </p>

          {!isCompany ? <p>{initialProfileData.education}</p> : null}
        </div>

        <div className='flex items-center p-5 space-x-2 max-sm:hidden'>
          <Button size='xs' variant='subtle' className='px-8 rounded-3xl'>
            <PlusIcon size={14} className='mr-1' />
            Follow
          </Button>

          <Button
            size='xs'
            variant='outline'
            className='px-5 rounded-3xl bg-transparent'
          >
            Visit website
            <ArrowUpRightSquare size={14} className='ml-1' />
          </Button>

          <Button
            size='xs'
            variant='outline'
            className='px-5 rounded-3xl bg-transparent'
          >
            More
          </Button>
        </div>
      </div>

      <div className='whitespace-pre-wrap p-5 bg-white mt-5 rounded-lg'>
        {initialProfileData.summary}
      </div>

      {initialProfileData?.content ? (
        <div className='mt-5 p-5 bg-white shadow rounded-lg'>
          <div
            dangerouslySetInnerHTML={{
              __html: initialProfileData.content as TrustedHTML,
            }}
            className='[&>p>a]:text-blue-500 [&>p>a]:font-semibold [&>ol]:ml-10 [&>ol>li]:list-decimal [&>ul]:ml-10 [&>ul>li]:list-disc [&>h2]:text-lg [&>h2]:font-extrabold'
          ></div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
