'use client';
import Button from '@/components/ui/Button';
import { InputBase } from '@/components/ui/InputBase';
import InputSelect from '@/components/ui/InputSelect';
import CompanyModel from '@/models/Company';
import { TCompany, TResponse } from '@/types/globalType';
import { useQuery } from '@tanstack/react-query';
import { SearchIcon } from 'lucide-react';
import React, { useState } from 'react';

const Search = () => {
  // const { data: companies, isLoading } = useQuery({
  //   queryKey: ['companies'],
  //   queryFn: () => CompanyModel.list(),
  // });

  const options = [
    {
      label: 'All city',
      value: 'all',
    },
    {
      label: 'Ho Chi Minh',
      value: 'hcm',
    },
    {
      label: 'Da Nang',
      value: 'dn',
    },
    {
      label: 'Ha Noi',
      value: 'hn',
    },
  ];

  const handleChangeValue = (value: any) => {
    console.log(value);
  };

  return (
    <div className='p-5 bg-white rounded-lg shadow'>
      <div className='flex items-center space-x-2'>
        <div className='w-[20%]'>
          <InputSelect
            options={options}
            onChange={handleChangeValue}
            defaultValue='all'
          />
        </div>

        <div className='w-[60%]'>
          <InputBase name='skill' onChange={handleChangeValue} />
        </div>

        <Button className='w-[20%]'>
          <SearchIcon size={16} className='mr-1' />
          Search
        </Button>
      </div>

      <div></div>
    </div>
  );
};

export default Search;
