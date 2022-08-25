import { NextPage } from 'next';
import Head from 'next/head';
import { useWheels } from '../src/hooks/useWheel';
import Header from '../src/features/_main/Header';
import GnbModal from '../src/features/_main/GnbModal';
import { useAppSelector } from '../src/hooks/exhook';
import { userState } from '../src/features/user/userSlice';
import JoinModal from '../src/features/user/JoinModal';
import { scrollCount } from '../src/modules/modalSlice';
import Login from '../src/features/user/Login';

// 'next/document' 의 `Head` 컴포넌트 를 사용함으로 SEO(Search Engine Optimization) 를 가능하게 만듬.
const Main: NextPage = () => {
  const control = useAppSelector(scrollCount)

  const user = useAppSelector(userState);

  console.log(user)
  return (
    <div className="h-full">
      <Head>
        <title>임시 인덱스</title>
        <meta name="description" content="임시 인덱스 페이지입니다." />
      </Head>
      <div className="w-full h-full">

        <div className="w-full h-screen bg-black">
          <div
            id="main-inner"
            className="mx-auto max-w-7xl pt-20 w-full min-h-screen"
            style={{ background: 'url(/test_bac.png)' }}
          >
            <div className="text-white">
              <Login />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
