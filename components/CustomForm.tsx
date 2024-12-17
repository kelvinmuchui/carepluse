'use client';
import React from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { FormFieldType } from './forms/PatientForm';
import Image from 'next/image';
import PhoneInput from 'react-phone-number-input/input';
import 'react-phone-number-input/style.css'
import { E164Number } from 'libphonenumber-js';

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, iconSrc, iconAlt, placeholder } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:

      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || 'icon'}
              className='ml-s'
            />
          )}
    
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className='shad-input bolder-0'
            />
          </FormControl>
        </div>
      );
      case FormFieldType.PHONE_INPUT:
        return (
          <FormControl>
          <PhoneInput
            defaultCountry="US" // Default country code
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined} // Value controlled by react-hook-form
            onChange={field.onChange}
            className="input-phone" // Add custom styles here
          />
        </FormControl>
        )
    // Add cases for other FormFieldType values if necessary

    default:
      return null; // Return null if no matching field type
  }
};

function CustomForm(props: CustomProps) {
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex-1'>
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />
          <FormMessage className='shad-error' />
        </FormItem>
      )}
    />
  );
}

export default CustomForm;
