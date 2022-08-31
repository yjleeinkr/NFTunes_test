import useWeb3 from '../../hooks/useWeb3';
import SubscribeContract from '../../../../truffle/build/contracts/Subscribe.json';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/exhook';
import { subscribeAsync } from '../user/userSlice';
import { userState } from '../user/userSlice';

const Subscribe = () => {
  //0xc82cf83F8F6381E17C348D418360b58767Df8567
  const user = useAppSelector(userState);
  const { account } = useWeb3();
  console.log(account);
  const dispatch = useAppDispatch();

  const sub = async () => {
    try {
      let result = await dispatch(subscribeAsync(account));
      console.log('result임?', result);
      // await window.ethereum.request({
      //   method: 'eth_sendTransaction',
      //   params: [
      //     {
      //       from: result.payload.from,
      //       to: result.payload.to,
      //       value: result.payload.value,
      //     },
      //   ],
      // });
      if (result.type === 'user/subscribe/fulfilled') {
        console.log('확인')
        if( user.userInfo.subscribeState){
          alert('구독 완료');
          window.location.href = '/';
        }

      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <button
        className="bg-transparent hover:bg-white-500 text-white-700 font-semibold hover:text-pink py-2 px-4 border border-white-500 hover:border-transparent rounded"
        onClick={sub}
      >
        구독하기
      </button>
    </>
  );
};

export default Subscribe;
