import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FormControl, Button, Box, VStack, useToast, Flex } from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useAppContext } from 'src/context';
import { useEffect } from 'react';
import AppInput from 'src/components/AppInput';
import { descriptionRules, titleRules } from 'src/constants/rules';

export default function TodoForm() {
  const { closeModal } = useAppContext();
  const toast = useToast();

  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation(
    async ({ title, description }: TodoFields) => {
      return await axios.post(`/todos`, {
        title,
        description: !description ? 'no description' : description,
      });
    },
    {
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries('get-user');
        toast({
          title: data.message,
          status: 'success',
          isClosable: true,
        });
        closeModal();
      },
      onError: ({ response }) => {
        const errors = response?.data?.errors
          ?.map((err: any) => `${err.instancePath} ${err.message}`)
          .join(', ');
        toast({
          title: errors ?? (response.data.message || response.statusText),
          status: 'error',
          isClosable: true,
        });
      },
    },
  );

  const fields: FormField<TodoFields> = {
    title: {
      rules: { ...titleRules, required: 'Title is required' },
    },
    description: {
      component: 'textarea',
      rules: descriptionRules,
    },
  };

  const {
    handleSubmit,
    setFocus,
    control,
    formState: { isSubmitting, isValid, isDirty, isSubmitted },
  } = useForm<FieldValues>();

  useEffect(() => {
    setFocus('title');
  }, [setFocus]);

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(mutate as SubmitHandler<FieldValues>)}>
      <VStack
        {...{ width: '100%', as: FormControl, spacing: 7 }}
        isInvalid={!isValid && isDirty && isSubmitted}
      >
        {Object.entries(fields).map(([name, props]) => (
          <AppInput key={name} {...{ name, control }} {...props} />
        ))}
      </VStack>
      <Flex gap={4} justify="end" mt={8}>
        <Button {...{ colorScheme: 'teal', type: 'submit' }} isLoading={isSubmitting || isLoading}>
          Submit
        </Button>
        <Button colorScheme="red" onClick={closeModal}>
          Cancel
        </Button>
      </Flex>
    </Box>
  );
}
