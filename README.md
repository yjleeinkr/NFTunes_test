`npx create-next-app@latest --ts`

## next.js dev 실행
`npm run dev`

## 라우팅

`pages` 디렉토리가 라우터연결의 root 위치가 된다.

- ex) `pages/api/hello` = `http://localhost:3000/api/hello`
- ex) `pages/markets/index` = `http://localhost:3000/markets`

## Next.js 의 'get' 함수들
> 해당 함수들은 호출하지 않아도 빌드시 자동으로 실행된다.
> 즉, 해당 페이지의 컴포넌트가 랜더 되기전에 먼저 실행됨

### getStaticProps
해당 페이지 별로 데이터를 패칭함. (state 에 들어감.)

### getStaticPaths
정해진 path 에 한해 정적라우팅이 되도록 함 (속도가 매우 빨라짐 ..?) 

### getServerSideProps
빌드와 상관없이 매 페이지 요청마다 데이터를 서버로부터 가져옴.

## styled-component
이슈 : css 가 랜더되는 속도가 페이지 랜더보다 느리다는데...

## tailwindCss
