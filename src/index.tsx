import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './components/app';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';
import { AuthProvider } from './context/auth';
import './index.css';

const theme = extendTheme({ direction: 'rtl' });

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <React.Suspense fallback={'loading'}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </React.Suspense>
      </RecoilRoot>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
