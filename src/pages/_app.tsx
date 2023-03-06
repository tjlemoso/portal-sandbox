import '@/styles/index.css'
import '@/styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'toastr/build/toastr.min.css';
import type { AppProps } from 'next/app'
import AppProvider from '@/hooks';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
  
}
