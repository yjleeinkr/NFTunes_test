import '../src/modules/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../src/modules/store';
import { useWheels } from '../src/hooks/useWheel';
import Header from '../src/features/_main/Header';
import Gnb from '../src/features/_main/Gnb';

function MyApp({ Component, pageProps }: AppProps) {

  const { isWheel, eventWheel } = useWheels()

  return (
    <Provider store={store}>
      <div className="w-full h-full" onWheel = {( e => eventWheel(e) )}>
        <Header eventProps = {isWheel} />
        <Gnb />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
