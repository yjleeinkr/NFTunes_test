import Minting from '../../src/features/mypage/Minting';
import styled from 'styled-components';
import Image from 'next/image';
import axios from 'axios';

// worker : gyuri
// last work : 220824
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
    font-family: 'Regular';
    font-size: 20px;
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
    font-family: 'Light';
    font-size: 20px;
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
  > h1 {
    padding: 20px;
    font-family: 'Fly';
    color: #efefef;
  }
`;

const AlbumForm = styled.form`
  background: red;
  width: 90%;
  height: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  font-family: 'Fly';
  justify-content: space-between;

  #submit {
    box-shadow: inset 0px 0px 29px -20px #ffffff;
    background: linear-gradient(to bottom, #ededed 5%, #dfdfdf 100%);
    background-color: #ededed;
    border: 1px solid #dcdcdc;
    display: block;
    cursor: pointer;
    color: #575757;
    font-family: Arial;
    font-size: 15px;
    font-weight: bold;
    padding: 10px 35px;
    font-family: 'Regular';
    text-decoration: none;
    text-shadow: 0px 1px 0px #ffffff;
    margin: 0 auto;
  }

  #submit:hover {
    background: linear-gradient(to bottom, #dfdfdf 5%, #ededed 100%);
    background-color: #dfdfdf;
  }

  #submit:active {
    position: relative;
    top: 1px;
  }
`;

const MintingMusicToken = () => {
  const uploadFile = async (file) => {
    try {
      const { data } = await axios.post('http://localhost:4000/api/register/thumbnail', file);
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  const upload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', e.target.file.files[0]);
    for (let value of formData.values()) {
      console.log(value);
    }
    await uploadFile(formData);
  };

  return (
    <OutBox>
      <MainBox>
        <h1>Music Uploads</h1>
        <UploadContainer>
          <AlbumBox>
            <AlbumCoverBox>
              <AlbumImg>
                <form encType="multipart/form-data" onSubmit={upload}>
                  <input type="file" name="file" />
                  <button type="submit">업로드</button>
                </form>
              </AlbumImg>
              <MusicUpload />
            </AlbumCoverBox>
            <AlbumInfo>
              <h1>앨범 소개</h1>
              <AlbumForm>
                <input type="text" placeholder="작사가" />
                <input type="text" placeholder="작곡가" />
                <textarea cols={60} rows={8} placeholder="곡 소개"></textarea>
                <input type="submit" id="submit" value="Upload" />
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
