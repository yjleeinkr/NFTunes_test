import styled from 'styled-components';
import { NextPage } from 'next';

// Work: gyuri
// last update: 220825

const OutBox = styled.div`
  background: black;
  width: 100%;
  height: 1400px;
  padding-top: 100px;
`;

const MainBox = styled.div`
  width: 70%;
  height: 1200px;
  background: red;
  margin: 0 auto;
`;

const MusicInfoBox = styled.div`
  width: 100%;
  height: 600px;
  background: pink;
`;

const DetailsPage: NextPage = () => {
  return (
    <>
      <OutBox>
        <MainBox>
          <MusicInfoBox></MusicInfoBox>
        </MainBox>
      </OutBox>
    </>
  );
};

export default DetailsPage;
