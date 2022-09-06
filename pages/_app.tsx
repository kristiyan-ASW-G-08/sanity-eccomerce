import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import Store, { persistor } from '../store/';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Footer from '@/components/Footer';
function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={Store}>
        {' '}
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
