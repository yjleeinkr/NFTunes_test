import Store from '../src/modules/store';
import '../src/modules/globals.css';
import type { AppProps } from 'next/app';
import { useWheels } from '../src/hooks/useWheel';
import Header from '../src/features/_main/Header';
import Gnb from '../src/features/_main/Gnb';
import './app.css';
function MyApp({ Component, pageProps }: AppProps) {
  const { isWheel, eventWheel } = useWheels();

  return (
    <Store>
      <div className="w-full h-full" onWheel={(e) => eventWheel(e)}>
        <Header eventProps={isWheel} />
        <Gnb />
        <Component {...pageProps} />
      </div>
    </Store>
  );
}

export default MyApp;
