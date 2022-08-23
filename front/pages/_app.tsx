import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
// import store from '../src/modules/store';
import Store from '../src/modules/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Store>
      <Component {...pageProps} />
    </Store>
  );
}

export default MyApp;
