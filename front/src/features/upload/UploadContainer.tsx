import styled from 'styled-components';
import axios from 'axios';
import { useRef, useState } from 'react';

const Container = styled.div`
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
  border: 1px solid #646464;
  border-radius: 5px;
  width: 100%;
  height: 450px;
  display: flex;

  > form {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

const UploadBox = styled.div`
  width: 40%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ImgUpload = styled.div`
  border: 0.5px dashed #646464;
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  > h3 {
    color: #999999;
    margin: 3px 10px;
    align-self: flex-start;
    font-size: 12px;
  }

  > img {
    width: 90%;
    height: 70%;
  }
`;

const UploadInput = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  height: 30px;

  > .file_name {
    width: 75%;
    font-size: 12px;
    background-color: transparent;
    color: #999999;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  > label {
    color: #fff;
    background-color: #999999;
    text-align: center;
    font-size: 70%;
    margin-left: 10px;
    cursor: pointer;
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    word-break: keep-all;
  }

  > input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
`;

const MusicUpload = styled.div`
  width: 100%;
  height: 25%;
  border: 0.5px dashed #646464;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  > h3 {
    color: #999999;
    margin: 3px 10px;
    align-self: flex-start;
    font-size: 12px;
  }
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

const AlbumForm = styled.div`
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

const UploadContainer = () => {
  const [coverName, setCoverName] = useState('');
  const [audioName, setAudioName] = useState('');
  const coverRef = useRef<HTMLInputElement>();
  const imgRef = useRef<HTMLImageElement>();
  const audioRef = useRef<HTMLInputElement>();

  const uploadCover = async (file: FormData) => {
    try {
      const { data } = await axios.post('http://localhost:4000/api/register/thumbnail', file);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const uploadMusic = async (file: FormData) => {
    try {
      const { data } = await axios.post('http://localhost:4000/api/register/music', file);
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  const upload = async (e: any) => {
    e.preventDefault();
    const formDataImg: FormData = new FormData();
    const formDataAudio: FormData = new FormData();
    formDataImg.append('cover', e.target.cover.files[0]);
    formDataAudio.append('music', e.target.music.files[0]);
    for (let value of formDataImg.values()) {
      console.log('밸류1', value);
    }
    for (let value of formDataAudio.values()) {
      console.log('밸류2', value);
    }
    uploadCover(formDataImg);
    uploadMusic(formDataAudio);
  };

  const readURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      let reader: FileReader = new FileReader();
      // coverRef.current.value = e.target.files[0].name;
      setCoverName(e.target.files[0].name);
      reader.onload = function (e) {
        imgRef.current.src = `${e.target.result}`;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const attachAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAudioName(e.target.files[0].name);
  };

  return (
    <Container>
      <AlbumBox>
        <form encType="multipart/form-data" onSubmit={upload}>
          <UploadBox>
            <ImgUpload>
              <h3>1. cover 사진 첨부</h3>
              <img id="preview" ref={imgRef} />
              <UploadInput>
                <input className="file_name" ref={coverRef} value={coverName} disabled />
                <label htmlFor="album_cover">파일찾기</label>
                <input type="file" name="cover" id="album_cover" accept="image/*" onChange={readURL} src="" />
              </UploadInput>
            </ImgUpload>
            <MusicUpload>
              <h3>2. 음악 첨부</h3>
              <UploadInput>
                <input className="file_name" ref={audioRef} value={audioName} disabled />
                <label htmlFor="music">파일찾기</label>
                <input type="file" name="music" id="music" accept="audio/*" onChange={attachAudio} />
              </UploadInput>
            </MusicUpload>
          </UploadBox>
          <AlbumInfo>
            <h1>앨범 소개</h1>
            <AlbumForm>
              <input type="text" placeholder="작사가" />
              <input type="text" placeholder="작곡가" />
              <textarea cols={50} rows={8} placeholder="곡 소개"></textarea>
              <input type="submit" id="submit" value="업로드" />
            </AlbumForm>
          </AlbumInfo>
        </form>
      </AlbumBox>
      <h1>Provide FLAC, WAV, ALAC, or AIFF for highest audio quality.</h1>
    </Container>
  );
};

export default UploadContainer;
