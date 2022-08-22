import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

export default function AccountPage({ account }:any) {
  const router = useRouter();

  if(router.isFallback) {
    return <div>Loading 중 표현하는 컴포넌트 맘대로 구현가능....!</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{account}의 개별 페이지입니다.</h1>
      <h1>여기는 무슨페이지가 될까</h1>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { account:'' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = ({ params }:any) => {
  let account:string = params.account

  if(!account) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      account
    }
  }
}
