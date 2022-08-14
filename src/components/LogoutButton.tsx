import { DownloadIcon } from '@chakra-ui/icons';
import { Button, IconButton, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { useAppContext } from 'src/context';

export default function LogoutButton({ ...props }: IconButtonProps) {
  const {
    User: [, setUser],
    openModal,
    closeModal,
  } = useAppContext();
  const toast = useToast();

  const { isLoading, mutate: logout } = useMutation(async () => await axios.get(`/users/logout`), {
    onSuccess: ({ data }) => {
      setUser(null);
      toast({
        title: data?.message,
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
    onSettled: () => {
      closeModal();
    },
  });

  return (
    <IconButton
      {...props}
      icon={<DownloadIcon boxSize="1.8em" />}
      onClick={() =>
        openModal({
          header: 'Are you sure you want to Logout?',
          footer: (
            <>
              <Button
                {...{ colorScheme: 'blue', isLoading: isLoading, mr: 3 }}
                onClick={() => logout()}
              >
                Okay
              </Button>
              <Button colorScheme="red" mr={3} onClick={closeModal}>
                No
              </Button>
            </>
          ),
        })
      }
    />
  );
}
