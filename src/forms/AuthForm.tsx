import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FormControl, Button, Box, Heading, VStack, useToast } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useAppContext } from 'src/context';
import AppInput from 'src/components/AppInput';
import { emailRules, passwordRules } from 'src/constants/rules';

export default function AuthForm() {
  const {
    User: [, setUser],
  } = useAppContext();
  const toast = useToast();
  const { isLoading, mutate } = useMutation(
    async (values: AuthFields) => {
      return await axios.post(`/users`, values);
    },
    {
      onSuccess: ({ data }) => {
        setUser(data.user);
        toast({
          title: data?.message,
          status: 'success',
          isClosable: true,
        });
      },
      onError: ({ response }) => {
        const errors = response?.data?.errors?.map((err: any) => err.message).join(', ');
        toast({
          title: errors ?? (response.data.message || response.statusText),
          status: 'error',
          isClosable: true,
        });
      },
    },
  );

  const fields: FormField<AuthFields> = {
    email: {
      rules: emailRules,
    },
    password: {
      type: 'password',
      rules: passwordRules,
    },
  };

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, isDirty, isSubmitted },
  } = useForm<FieldValues>();

  return (
    <VStack spacing={8} width="100%" maxWidth="sm" m="auto">
      <Heading as="h1" size="4xl" noOfLines={1}>
        TODOS
      </Heading>

      <Box as="form" width="100%" onSubmit={handleSubmit(mutate as SubmitHandler<FieldValues>)}>
        <VStack
          width="100%"
          as={FormControl}
          spacing={7}
          isInvalid={!isValid && isDirty && isSubmitted}
        >
          {Object.entries(fields).map(([name, props]) => (
            <AppInput key={name} {...{ name, control }} {...props} />
          ))}
          <Button
            {...{ w: '100%', mt: 4, colorScheme: 'teal', type: 'submit' }}
            isLoading={isSubmitting || isLoading}
          >
            Submit
          </Button>
        </VStack>
      </Box>
    </VStack>
  );
}
