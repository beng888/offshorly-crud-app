import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { ContextProvider } from 'src/context';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_SERVER_BASE_URL
    : process.env.REACT_APP_PROD_SERVER_BASE_URL;

axios.defaults.withCredentials = true;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <ChakraProvider className="App">
          <App />
        </ChakraProvider>
      </ContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
