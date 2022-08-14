import { AddIcon } from '@chakra-ui/icons';
import { useAppContext } from 'src/context';
import { forwardRef, LegacyRef } from 'react';
import TodoForm from 'src/forms/TodoForm';
import { IconButton } from '@chakra-ui/react';

const AddTodoButton = forwardRef(
  ({ ...props }: IconButtonProps, ref: LegacyRef<HTMLButtonElement>) => {
    const { openModal } = useAppContext();

    return (
      <IconButton
        ref={ref}
        {...props}
        icon={<AddIcon boxSize="1.8em" />}
        onClick={() =>
          openModal({
            header: 'Add a Todo',
            body: <TodoForm />,
            footer: <></>,
          })
        }
      />
    );
  },
);
export default AddTodoButton;
