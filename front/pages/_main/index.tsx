import { NextPage } from 'next';
import Head from 'next/head';

import Header from '../../src/features/_main/Header';

// 'next/document' 의 `Head` 컴포넌트 를 사용함으로 SEO(Search Engine Optimization) 를 가능하게 만듬.
const TempMain: NextPage = () => {
  return (
    <>
      <Head>
        <title>임시 인덱스</title>
        <meta name="description" content="임시 인덱스 페이지입니다." />
      </Head>
      <div>
        <Header />
      </div>
    </>
  )
}

export default TempMain
