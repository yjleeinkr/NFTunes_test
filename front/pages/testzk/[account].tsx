import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

export default function AccountPage({ account }:any) {
  const router = useRouter();

  if(router.isFallback) {
    return <div>Loading 중 표현하는 컴포넌트 맘대로 구현가능....!</div>
  }

  return (
    <>
      <div>{account}의 개별 페이지입니다.</div>
      <div>여기는 무슨페이지가 될까</div>
    </>
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
