import Minting from '../../src/features/mypage/Minting';
import styled from 'styled-components';
import Image from 'next/image';
const OutBox = styled.div`
  background: black;
  width: 100%;
  height: 1200px;
`;

const MainBox = styled.div`
  /* background: black; */
  width: 70%;
  height: 1000px;
  margin: 0 auto;
  padding-top: 100px;

  > h1 {
    color: white;
    height: 50px;
    width: 80%;
    margin: 0 auto;
    border-bottom: 0.5px solid #646464;
  }
`;

const UploadContainer = styled.div`
  /* background: purple; */
  width: 80%;
  height: 800px;
  margin: 0 auto;
  margin-top: 40px;
  > h1 {
    margin-top: 60px;
    text-align: center;
    color: #efefef;
  }
`;
const AlbumBox = styled.div`
  background: blue;
  width: 100%;
  height: 450px;
  display: flex;
  justify-content: space-around;
`;

const AlbumCoverBox = styled.div`
  background: green;
  width: 40%;
  height: 400px;
`;

const AlbumImg = styled.div`
  background: pink;
  width: 100%;
  height: 70%;
`;

const MusicUpload = styled.div`
  background: yellow;
  width: 100%;
  height: 30%;
`;

const AlbumInfo = styled.div`
  background: skyblue;
  width: 50%;
  height: 400px;
`;

const AlbumForm = styled.form`
  background: red;
  width: 90%;
  height: 400px;
  margin: 0 auto;
  padding-top: 20px;

  #submit {
    display: block;
    width: 100px;
    height: 40px;
    background: #fff;
    margin: 0 auto;
  }
`;

const MintingMusicToken = () => {
  return (
    <OutBox>
      <MainBox>
        <h1>Music Uploads</h1>
        <UploadContainer>
          <AlbumBox>
            <AlbumCoverBox>
              <AlbumImg />
              <MusicUpload />
            </AlbumCoverBox>
            <AlbumInfo>
              <AlbumForm>
                <h1>앨범 소개</h1>
                <input type="text" placeholder="작사가" />
                <input type="text" placeholder="작곡가" />
                <textarea cols={60} rows={10}></textarea>
                <input type="submit" id="submit" value="등록하기" />
              </AlbumForm>
            </AlbumInfo>
          </AlbumBox>
          <h1>Provide FLAC, WAV, ALAC, or AIFF for highest audio quality.</h1>
        </UploadContainer>
      </MainBox>
    </OutBox>
  );
};

export default MintingMusicToken;
