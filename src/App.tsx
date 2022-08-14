import { CircularProgress, Container } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from 'react-query';
import AuthForm from 'src/forms/AuthForm';
import { useAppContext } from 'src/context';
import Todos from 'src/modules/Todos';
import AppModal from 'src/components/AppModal';

function App() {
  const {
    User: [user, setUser],
  } = useAppContext();

  const { isLoading } = useQuery('get-user', async () => await axios.get('/users'), {
    onSuccess: ({ data }) => {
      setUser(data.user);
    },
  });

  if (isLoading)
    return (
      <Container centerContent minHeight="100vh">
        <CircularProgress isIndeterminate color="green.300" margin="auto" />;
      </Container>
    );

  return (
    <Container centerContent maxWidth="7xl" minHeight="100vh">
      <AppModal />
      {user ? <Todos /> : <AuthForm />}
    </Container>
  );
}

export default App;
