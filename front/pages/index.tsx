import { NextPage } from 'next';
import Head from 'next/head';
import { useAppSelector } from '../src/hooks/exhook';
import { userState } from '../src/features/user/userSlice';
import { scrollCount } from '../src/modules/modalSlice';
import Login from '../src/features/user/Login';
import Content from '../src/features/_main/Content';
import Cat1 from '../src/test/cat1';
import Cat2 from '../src/test/cat2';
import Cat3 from '../src/test/cat3';

// 'next/document' 의 `Head` 컴포넌트 를 사용함으로 SEO(Search Engine Optimization) 를 가능하게 만듬.
const Main: NextPage = () => {
  const control = useAppSelector(scrollCount);

  const user = useAppSelector(userState);

  console.log(user);
  return (
    <div className="h-full">
      <Head>
        <title>임시 인덱스</title>
        <meta name="description" content="임시 인덱스 페이지입니다." />
      </Head>
      <section className=" h-screen ">
        <div className="pt-20 text-white">
          <Login />
        </div>
        <div className="relative max-w-7xl w-screen h-screen m-36 snap-center flex-shrink-0 ">
          <Cat1 />
        </div>
        <div className="relative max-w-7xl w-screen h-screen m-36 snap-center flex-shrink-0">
          <Cat2 />
        </div>
        <div className="relative max-w-7xl w-screen h-screen m-36 snap-end flex-shrink-0">
          <Cat3 />
        </div>
      </section>
    </div>
  );
};

export default Main;
