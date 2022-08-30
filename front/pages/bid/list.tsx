import styled from 'styled-components';
import Card from '../../src/features/bidList/card';
import { NextPage } from 'next';

const OutBox = styled.div`
  width: 100%;
  height: 1200px;
`;

const MainBox = styled.div`
  background: black;
  width: 80%;
  height: 350px;
  margin: 0 auto;
  padding-top: 100px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
`;

const albumPicList = [
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
  'http://localhost:4000/upload/user.png',
];

const bidList: NextPage = () => {
  return (
    <OutBox>
      <MainBox />
      <MainBox>
        {albumPicList.map((v, i) => (
          <Card url={v} id={i} />
        ))}
      </MainBox>
    </OutBox>
  );
};

export default bidList;
