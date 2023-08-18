'use client';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/hooks/use-toast';
import ProfileModel from '@/models/Profile';
import { TProfile, TResponse } from '@/types/globalType';

//
import { useMutation, useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import React, { FC, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextareaAutoSize from 'react-textarea-autosize';
import Upload from '@/components/ui/Upload';
import { modulesQuill } from '@/enums';
import CompanyModel from '@/models/Company';

interface PageProps {
  userId: string;
  profileResponse: TProfile;
}

const QuillReact = dynamic(async () => (await import('react-quill')).default, {
  ssr: false,
});

const Editor: FC<PageProps> = ({ userId, profileResponse }) => {
  const pathName = usePathname();

  const isCompany = pathName.includes('company');

  const { toastSuccess } = useToast();

  const router = useRouter();

  const [profile, setProfile] = useState<TProfile>(profileResponse);

  const [images, setImages] = useState({
    avatar: profile?.avatar,
    backgroundImage: profile?.backgroundImage,
  });

  const summaryRef = useRef<HTMLTextAreaElement | null | void>(null);

  const [content, setContent] = useState<any>(profile.content);

  const { isLoading, mutate: handleUpdateProfile } = useMutation({
    mutationFn: (data: any) => {
      if (isCompany) {
        return CompanyModel.update(profile.id, data);
      } else {
        return ProfileModel.update(profile.id, data);
      }
    },
    onSuccess: (data: any) => {
      toastSuccess(data?.message);
      router.refresh();
      if (data?.status === 200) {
        router.back();
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      headLine: profile?.headLine,
      education: profile?.education,
      industry: profile?.industry,
      region: profile?.region,
      city: profile?.city,
      summary: profile?.summary,
      avatar: profile?.avatar,
      backgroundImage: profile?.backgroundImage,
      companySize: profile?.companySize,
      contact: profile?.contact,
      content: profile?.content,
    },
  });

  const { ref: summary, ...summaryRest } = register('summary');

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      content,
      ...images,
      userId: userId,
    };

    await handleUpdateProfile(payload);
  };

  return (
    <div className='bg-white p-5 rounded-lg w-full'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <div className='flex items-center'>
          <span className='w-40 flex-shrink-0'>First Name</span>
          <Input name='firstName' register={register} errors={errors} />
        </div>

        <div className='flex items-center'>
          <span className='w-40 flex-shrink-0'>Last Name</span>
          <Input name='lastName' register={register} errors={errors} />
        </div>

        <div className='flex items-center'>
          <span className='w-40 flex-shrink-0'>Head Line</span>
          <Input name='headLine' register={register} errors={errors} />
        </div>

        {isCompany ? (
          <div className='flex items-center'>
            <span className='w-40 flex-shrink-0'>Company Size</span>
            <Input name='companySize' register={register} errors={errors} />
          </div>
        ) : (
          <div className='flex items-center'>
            <span className='w-40 flex-shrink-0'>Education</span>
            <Input name='education' register={register} errors={errors} />
          </div>
        )}

        <div className='flex items-center'>
          <span className='w-40 flex-shrink-0'>Industry</span>
          <Input name='industry' register={register} errors={errors} />
        </div>

        <div className='flex items-center'>
          <span className='w-40 flex-shrink-0'>Region</span>
          <Input name='region' register={register} errors={errors} />
        </div>

        <div className='flex items-center'>
          <span className='w-40 flex-shrink-0'>City</span>
          <Input name='city' register={register} errors={errors} />
        </div>

        <div className='flex items-center'>
          <span className='w-40 flex-shrink-0'>Contact</span>
          <Input name='contact' register={register} errors={errors} />
        </div>

        <div className='flex items-center'>
          <span className='w-40 flex-shrink-0'>Summary</span>
          <TextareaAutoSize
            ref={(e) => {
              summary(e);
              summaryRef.current = e;
            }}
            {...summaryRest}
            placeholder='Summary'
            className='w-full resize-none appearance-none border p-5 rounded-lg overflow-hidden bg-transparent text-sm focus:outline-none focus:border-2 focus:border-slate-900'
          />
        </div>

        <div className='flex items-center'>
          <span className='w-40 flex-shrink-0'>Content</span>
          <QuillReact
            theme='snow'
            className='w-full'
            modules={modulesQuill}
            value={content}
            onChange={setContent}
          />
        </div>

        <div className='flex items-center'>
          <span className='w-40 flex-shrink-0'>Avatar</span>
          <Upload
            userId={userId}
            img={profile?.avatar}
            onChange={(data: any) =>
              setImages((prev) => ({
                ...prev,
                avatar: data,
              }))
            }
          />
        </div>

        <div className='flex items-center'>
          <span className='w-40 flex-shrink-0'>Background Image</span>
          <Upload
            userId={userId}
            img={profile?.backgroundImage}
            onChange={(data: any) =>
              setImages((prev) => ({
                ...prev,
                backgroundImage: data,
              }))
            }
          />
        </div>

        <div className='w-full flex justify-end'>
          <Button isLoading={isLoading} type='submit'>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Editor;
