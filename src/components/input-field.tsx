import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useMergeRefs,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

type Props = {
  error?: { message: string };
  label?: string;
  name: string;
  type?: string;
  defaultValue?: string;
  // allow ...inputProps
  [x: string]: any;
};

const InputField = React.forwardRef(
  (
    {
      error,
      label,
      name,
      type = 'text',
      defaultValue = '',
      control,
      rules,
      ...inputProps
    }: Props,
    ref
  ) => {
    const refs = useMergeRefs(ref);
    return (
      <FormControl isInvalid={!!error} ref={refs}>
        {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={rules}
          render={({ field }) => (
            <Input {...field} id={name} type={type} {...inputProps} />
          )}
        />
        <FormErrorMessage mt="1">{error && error.message}</FormErrorMessage>
      </FormControl>
    );
  }
);

export default InputField;
