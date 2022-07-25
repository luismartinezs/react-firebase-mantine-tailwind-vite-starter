import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClientProvider } from 'react-query';

import Router from '@/Router';
import queryClient from '@/app/queryClient';
import FirebaseApp from '@/components/FirebaseApp';
import ThemeProvider from '@/components/ThemeProvider';

function App() {
  return (
    <React.StrictMode>
      <FirebaseApp>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ThemeProvider>
              <Router />
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </BrowserRouter>
        </QueryClientProvider>
      </FirebaseApp>
    </React.StrictMode>
  );
}

export default App;
