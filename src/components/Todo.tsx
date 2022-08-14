import { CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  IconButton,
  Text,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { titleRules } from 'src/constants/rules';
import AppInput from './AppInput';

export default function Todo({ title, description, id, done }: TodoProps) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [isEditingDescription, setIsEditingDescription] = useState<boolean>(false);

  const { isLoading: isDeleting, mutate: deleteTodo } = useMutation(
    async (id: number) => await axios.delete(`/todos/${id}`),
    {
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries('get-user');
        toast({
          title: data.message,
          status: 'success',
        });
      },
      onError: ({ response }) => {
        toast({
          title: response.data.message || response.statusText,
          status: 'error',
        });
      },
    },
  );

  const { isLoading: isUpdating, mutate: updateTodo } = useMutation(
    async (values: TodoFields) => {
      return await axios.put(`/todos/${id}`, values);
    },
    {
      onSuccess: ({ data }) => {
        if (data.data.title !== title) setIsEditingTitle(false);
        if (data.data.description !== description) setIsEditingDescription(false);

        queryClient.invalidateQueries('get-user');
        toast({
          title: data.message,
          status: 'success',
          isClosable: true,
        });
      },
      onError: ({ response }) => {
        toast({
          title: response.data.message || response.statusText,
          status: 'error',
          isClosable: true,
        });
      },
    },
  );

  const {
    handleSubmit,
    control,
    setFocus,
    setValue,
    watch,
    formState: { isValid, errors, isDirty, isSubmitted, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      title: title,
      description: description,
      done: done,
    },
  });

  useEffect(() => {
    if (isEditingTitle) setFocus('title');
    if (isEditingDescription) setFocus('description');
  }, [isEditingTitle, isEditingDescription, setFocus]);

  return (
    <Box as="form" onSubmit={handleSubmit(updateTodo as SubmitHandler<FieldValues>)}>
      <AccordionItem as={FormControl} isInvalid={!isValid && isDirty && isSubmitted} mb="1rem">
        <Flex {...{ justify: 'space-between', align: 'center', w: '100%', gap: '1rem' }}>
          {isEditingTitle ? (
            <AppInput
              control={control}
              name="title"
              rules={titleRules}
              labelProps={{ display: 'none' }}
            />
          ) : (
            <Flex gap="1rem" align="center">
              <Button
                isLoading={isSubmitting || isUpdating}
                type="submit"
                onClick={() => setValue('done', !done)}
                colorScheme={done ? 'whatsapp' : 'gray'}
              >
                <AppInput
                  control={control}
                  name="done"
                  labelProps={{ display: 'none' }}
                  component="checkbox"
                  size="lg"
                  colorScheme=""
                  type="submit"
                  isChecked={done}
                />
              </Button>
              <Flex>
                <Tooltip label={title}>
                  <Heading as="h4" size="xl" noOfLines={1} maxWidth="calc(100vw - 280px)">
                    {title}
                  </Heading>
                </Tooltip>
              </Flex>
            </Flex>
          )}

          <Flex align="center" gap="1rem">
            {isEditingTitle && (
              <Button
                disabled={title === watch('title')}
                type="submit"
                colorScheme="teal"
                isLoading={isSubmitting || isUpdating}
              >
                Submit
              </Button>
            )}
            <IconButton
              aria-label="Edit Todo"
              colorScheme={isEditingTitle ? 'red' : 'yellow'}
              icon={isEditingTitle ? <CloseIcon /> : <EditIcon />}
              onClick={() => setIsEditingTitle(!isEditingTitle)}
            />
            <IconButton
              isLoading={isDeleting}
              aria-label="Delete Todo"
              colorScheme="red"
              icon={<DeleteIcon />}
              onClick={() => deleteTodo(id)}
            />
            <AccordionButton bg="cornflowerblue" w="fit-content" padding="1rem">
              <AccordionIcon />
            </AccordionButton>
          </Flex>
        </Flex>

        <Flex as={AccordionPanel} justify="space-between" align="center" gap="1rem" pt="1.5rem">
          {isEditingDescription ? (
            <AppInput
              control={control}
              name="description"
              rules={titleRules}
              labelProps={{ display: 'none' }}
              component="textarea"
            />
          ) : (
            <Tooltip label={title}>
              <Text fontSize="2xl" noOfLines={1}>
                {description}
              </Text>
            </Tooltip>
          )}
          {isEditingDescription && (
            <Button
              type="submit"
              disabled={description === watch('description')}
              colorScheme="teal"
              isLoading={isSubmitting || isUpdating}
            >
              Submit
            </Button>
          )}
          <IconButton
            aria-label="Edit Todo"
            colorScheme={isEditingDescription ? 'red' : 'green'}
            icon={isEditingDescription ? <CloseIcon /> : <EditIcon />}
            onClick={() => setIsEditingDescription(!isEditingDescription)}
          />
        </Flex>
      </AccordionItem>{' '}
    </Box>
  );
}
