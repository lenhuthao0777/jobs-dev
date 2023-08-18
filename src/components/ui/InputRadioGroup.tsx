import React, { ChangeEvent, FC } from 'react';
import { RadioGroup, RadioGroupItem } from './radio-group';

interface RadioGroupProps {
  options?: Array<options>;
  defaultValue?: string | undefined;
  name?: string;
  onChange?: any;
}

type options = {
  label: string;
  value: string;
};

const InputRadioGroup: FC<RadioGroupProps> = ({
  options = [],
  defaultValue,
  name,
  onChange,
}) => {
  return (
    <>
      <RadioGroup
        defaultValue={defaultValue}
        className='flex items-center'
        onValueChange={(value: string) => {
          onChange(value);
        }}
      >
        {options.map((item: options) => (
          <div key={item.value} className='flex items-center space-x-2 text-xs'>
            <RadioGroupItem value={item.value} id={item.value} />
            <label htmlFor={item.value}>{item.label}</label>
          </div>
        ))}
      </RadioGroup>
    </>
  );
};

export default InputRadioGroup;
