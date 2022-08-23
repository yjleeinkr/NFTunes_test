import { NextPage } from 'next';
import Head from 'next/head';

import Header from '../../src/features/_main/Header';
import { useState } from 'react';

// 'next/document' 의 `Head` 컴포넌트 를 사용함으로 SEO(Search Engine Optimization) 를 가능하게 만듬.
const TempMain: NextPage = () => {
  const [isWheel,setIsWheel] = useState<number>(-1)

  const wheel = (e) => {
    if (e.nativeEvent.deltaY > 0) {
      setIsWheel(e.nativeEvent.deltaY)
    } else {
      setIsWheel(e.nativeEvent.deltaY)
    }
  }

  return (
    <div className="h-full">
      <Head>
        <title>임시 인덱스</title>
        <meta name="description" content="임시 인덱스 페이지입니다." />
      </Head>
      <div className="w-full h-full"  onWheel = {( e => wheel(e) )}>
        <Header eventProps = {isWheel} />
        <div className="w-full min-h-screen" style={{background: 'url(/test_bac.png)'}}>
          <div className="mt-20 text-white">테스즈</div>
        </div>
      </div>
    </div>
  )
}

export default TempMain
