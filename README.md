## Front

> ### 1. git clone, pull 이후 `npm install` 실행
>
> ### 2. front 실행 : `npm run dev`

## 디렉토리

```shell
|
|-- @types
|
|-- pages
|   |-- api
|   |-- counter
|   |-- markets
|-- public
|
|-- src
|   |-- app
|   |-- features
|   |   |-- counter
|   |   |-- markets
|   |-- modules
|
|-- styles
|
```

## 페이지 현황

### market (main) -> localhost:3000

- 페이지 라우팅, `next.js get 함수`, api 응답 체험 ( redux 사용 X )

### counter -> localhost:3000/counter

- redux-toolKit (rtk), rtk-thunk 체험

## todoList

> tailwindCss 설정
>
> eslint, prettier 설정
>
> 회원가입, 로그인 화면

---

# 기술 스택 설명

## 라우팅

`pages` 디렉토리가 라우터연결의 root 위치가 된다.

- ex) `pages/api/hello` = `http://localhost:3000/api/hello`
- ex) `pages/markets/index` = `http://localhost:3000/markets`

### Next.js 의 'get' 함수들

> 해당 함수들은 호출하지 않아도 빌드시 자동으로 실행된다.
>
> 즉, 해당 페이지의 컴포넌트가 **랜더 되기전에** 먼저 실행됨

### getStaticProps

해당 페이지 별로 데이터를 패칭함. (state 에 들어감.)

### getStaticPaths

정해진 path 에 한해 정적라우팅이 되도록 함 (속도가 매우 빨라짐 ..?)

### getServerSideProps

빌드와 상관없이 매 페이지 요청마다 데이터를 서버로부터 가져옴.

### styled-component

이슈 : css 가 랜더되는 속도가 페이지 랜더보다 느리다는데... 모르겠땅

### tailwindCss

### rtk

### rtk-thunk

파일 주석, 링크 참조

## Back

1. 각자 db에 미리 database 만들기 (`$ create database nftMarket`)
2. `npm install` 해주기
3. 루트쪽에 아래처럼 .env 파일 만들기
   ```
   DB_USER=각자 db 계정
   DB_PASSWORD=계정 비번
   DB_DATABASE=nftMarket
   DB_HOST=127.0.0.1
   ```
4. `npm run dev` 로 서버실행 후 db 상에 User 테이블 제대로 생성되었는지 확인 할 것

```
$ USE nftMarket
$ SHOW TABLES
$ DESC User
```
