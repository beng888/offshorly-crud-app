import { IconButton, Input } from '@chakra-ui/react';

declare global {
  type UserProps = { email: string };
  interface TodoProps {
    title: string;
    description: string;
    done: string;
    id: number;
    userId: number;
  }

  type InputProps = React.ComponentProps<typeof Input>;
  type IconButtonProps = React.ComponentProps<typeof IconButton>;

  type FieldError = {
    type: string;
    ref?: Ref;
    types?: MultipleFieldErrors;
    message?: Message;
  };

  type TodoFields = { title: string; description: string };
  type AuthFields = { email: string; password: string };

  type FormField<T> = Record<keyof T, InputProps & { rules?: RegisterOptions }>;
}
