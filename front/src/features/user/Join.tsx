import { useEffect, useState } from 'react';
import useWeb3 from '../../hooks/useWeb3';
import { useAppSelector, useAppDispatch } from '../../hooks/exhook';
import { joinAsync, userState } from './userSlice';
import { batch } from 'react-redux';
import { handleJoin, handleScroll } from '../../modules/modalSlice';
import styled from "styled-components";

const Join = (props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userState);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  // const { web3, account, networkId } = useWeb3();

  const submitUserInfo = () => {
    let account = ''
    const userInfo: IUserInfo = {
      account,
      nickname,
      email,
    };
    dispatch(joinAsync(userInfo));
    setNickname('');
    setEmail('');
  };

  const clickModal = () => {
    batch( ()=> {
      dispatch(handleJoin())
      dispatch(handleScroll())
    })
  }
  
   useEffect(() => {
    if (user.userInfo.account !== '') {
      window.location.href = '/';
    }
  }, [user]);

  return (
    <div className="pr-10 pl-10 pt-5 mt-5 pb-5 mb-5 ">
      <div className="flex justify-center">
        <div id="join-outer" className="flex flex-col justify-center align-middle">
          <div id="join-input-box" className="pb-1 pl-0.5 pt-3 pr-3 border-b-2">
            <input
              type="text"
              name="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="text-zinc-200 bg-gray-500"
            />
          </div>
          <div id="join-input-box" className="pb-1 pl-0.5 pt-3 pr-3 border-b-2">
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-zinc-200 border-slate-300 shadow-sm focus:outline-none bg-gray-500"
            />
          </div>
        </div>
        <button onClick={submitUserInfo}>join</button>
      </div>
    </div>
  );
};



export default Join;
