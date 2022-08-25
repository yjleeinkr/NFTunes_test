import '../src/modules/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store,persistor } from '../src/modules/store';
import { PersistGate } from 'redux-persist/integration/react';
import Header from '../src/features/_main/Header';
import GnbModal from '../src/features/_main/GnbModal';
import JoinModal from '../src/features/user/JoinModal';
import { useWheels } from '../src/hooks/useWheel';
import Wrap from '../src/features/_main/Wrap';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Wrap>
          <Header />
          <GnbModal />
          <JoinModal />
          <Component {...pageProps} />
        </Wrap>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
