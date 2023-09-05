import React, { ChangeEvent, FC } from 'react';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from './select';
import { TOptions } from '@/types/globalType';

interface InputSelectProps {
  options: Array<TOptions>;
  defaultValue?: string;
  name?: string;
  onChange: (value: any) => void;
  placeholder?: string;
}

const InputSelect: FC<InputSelectProps> = ({
  options,
  defaultValue,
  name,
  onChange,
  placeholder,
}) => {
  return (
    <>
      <Select
        onValueChange={(e: any) => {
          return onChange && onChange(e);
        }}
        defaultValue={defaultValue}
      >
        <SelectTrigger className='w-full' aria-controls='radix-:R1mcq:'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((item: TOptions) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default InputSelect;
