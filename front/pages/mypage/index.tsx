import { NextPage } from 'next';
import Header from '../../src/features/_main/Header';
import { useWheels } from '../../src/hooks/useWheel';
import Minting from '../../src/features/mypage/Minting';
import styled from 'styled-components';
import userImg from '../../public/images/user.png';
import Image from 'next/image';

// worker : gyuri
// last work : 220824
const OutBox = styled.div`
  background: black;
  width: 100%;
  height: 1200px;
  padding-top: 100px;
`;

const MainBox = styled.div`
  width: 70%;
  height: 1000px;
  /* background: red; */
  margin: 0 auto;
`;

const ProfileBox = styled.div`
  /* background: pink; */
  width: 80%;
  height: 240px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const imgStyle = {
  borderRadius: '50%',
};

const ProfileInfo = styled.div`
  /* background: skyblue; */
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  > h1 {
    font-size: 26px;
    margin-left: 20px;
    color: #fff;
    font-family: 'Fly';
  }
`;

const ContentsBox = styled.div`
  /* background: red; */
  width: 100%;
  height: 600px;
  margin-top: 100px;
`;

const MusicMenu = styled.ul`
  /* background: purple; */
  width: 80%;
  height: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
`;

const IndividualMenu = styled.li`
  /* background: pink; */
  width: 12%;
  height: 100%;
  text-align: center;
  font-size: 20px;
  color: white;
  line-height: 46px;
  font-family: 'SemiBold';

  > a {
    display: block;
  }
  > a:hover {
    border-bottom: 2px solid #fff;
  }
`;

const Mypage: NextPage = () => {

  return (
    <div>
      <OutBox>
        <MainBox>
          <ProfileBox>
            <Image src={userImg} width={240} height={240} style={imgStyle} />
            <ProfileInfo>
              <h1>닉네임</h1>
              <h1>이메일</h1>
              <h1>지갑 주소</h1>
            </ProfileInfo>
          </ProfileBox>
          <ContentsBox>
            <MusicMenu>
              <IndividualMenu>
                <a>All</a>
              </IndividualMenu>
              <IndividualMenu>
                <a>Likes</a>
              </IndividualMenu>
              <IndividualMenu>
                <a>My Music</a>
              </IndividualMenu>
              <IndividualMenu>
                <a>Play List</a>
              </IndividualMenu>
              <IndividualMenu>
                <a>Payment</a>
              </IndividualMenu>
            </MusicMenu>
          </ContentsBox>
        </MainBox>
      </OutBox>
    </div>
  );
};

export default Mypage;
