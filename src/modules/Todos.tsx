import { Accordion, Box, Tooltip } from '@chakra-ui/react';
import AddTodoButton from 'src/components/AddTodoButton';
import LogoutButton from 'src/components/LogoutButton';
import Todo from 'src/components/Todo';
import { useAppContext } from 'src/context';

export default function Todos() {
  const {
    User: [user],
  } = useAppContext();
  const todos: TodoProps[] = user.todos;
  const empty: boolean = todos.length === 0;

  return (
    <Box margin="auto" w="100%">
      <LogoutButton
        {...{ transform: 'rotate(-90deg)', size: 'lg', isRound: true, 'aria-label': 'Logout' }}
        {...{ position: 'fixed', top: '1rem', right: '1rem' }}
      />

      <Tooltip
        {...{ isOpen: empty, placement: 'left', p: '10px' }}
        label="You have no todos yet, add one here 👉"
      >
        <AddTodoButton
          {...{ size: 'lg', isRound: true, 'aria-label': 'Add Todo' }}
          {...{ position: 'fixed', bottom: '1rem', right: '1rem' }}
        />
      </Tooltip>

      <Accordion w="100%" allowToggle>
        {todos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </Accordion>
    </Box>
  );
}
