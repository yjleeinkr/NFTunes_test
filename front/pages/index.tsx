import { NextPage } from 'next';
import Head from 'next/head';

import Header from '../src/features/_main/Header';
import { useWheels } from '../src/hooks/useWheel';

// 'next/document' 의 `Head` 컴포넌트 를 사용함으로 SEO(Search Engine Optimization) 를 가능하게 만듬.
const Main: NextPage = () => {

  const { isWheel, eventWheel } = useWheels()

  return (
    <div className="h-full">
      <Head>
        <title>임시 인덱스</title>
        <meta name="description" content="임시 인덱스 페이지입니다." />
      </Head>
      <div className="w-full h-full"  onWheel = {( e => eventWheel(e) )}>
        <Header eventProps = {isWheel} />
        <div className="pt-20 w-full min-h-screen" style={{background: 'url(/test_bac.png)'}}>
          <div className="text-white">
            <span>테스트테스트</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
