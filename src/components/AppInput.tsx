import {
  Box,
  Checkbox,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';

type Components = 'textarea' | 'default' | 'checkbox';
const components = {
  textarea: Textarea,
  checkbox: Checkbox,
  default: Input,
};

interface Props extends Partial<InputProps> {
  name: string;
  control: Control;
  component?: Components;
  rules?: RegisterOptions;
  labelProps?: FormLabelProps;
}

export default function AppInput({
  name,
  labelProps,
  control,
  rules,
  component = 'default',
  ...props
}: Props) {
  const Component = components[component] ?? components['default'];

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => {
        const error = fieldState?.error;

        return (
          <Box width="100%">
            <FormLabel textTransform="capitalize" htmlFor={name} {...labelProps}>
              {name}
            </FormLabel>
            <Box
              as={Component}
              width="100%"
              id={name}
              isInvalid={error}
              placeholder={name}
              {...props}
              {...field}
              value={field.value || ''}
            />
            <FormErrorMessage position="absolute" transform="translateY(-8px)">
              {error?.message}
            </FormErrorMessage>
          </Box>
        );
      }}
    />
  );
}
