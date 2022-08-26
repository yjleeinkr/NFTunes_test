import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/exhook';
import { handleGnb, handleJoin, handleScroll, scrollCount } from '../../modules/modalSlice';
import useWeb3 from '../../hooks/useWeb3';
import { batch } from 'react-redux';

const Header = (props) => {
  let router = useRouter();
  const dispatch = useAppDispatch();
  const [] = useState<string>('');

  const { web3, account, networkId } = useWeb3();

  let checkAcc;
  (() => {
    if (!account) {
      checkAcc = '메타로그인필요';
    } else {
      checkAcc = account;
    }
  })();

  const moveHeader = () => {
    let temp;
    if (props.isWheel < 0) {
      temp = 'translate-y-0';
    } else if (props.isWheel > 0) {
      temp = '-translate-y-full';
    }
    return `
      fixed translate-y-0 w-full h-20 bg-gradient-to-b from-teal-300/50 z-10
      `;
  };

  const clickModalBtn = (v) => {
    batch(() => {
      if (v === 'gnb') {
        dispatch(handleGnb());
      } else if (v === 'join') {
        dispatch(handleJoin());
      }
      dispatch(handleScroll());
    });
  };

  return (
    <div className="w-full h-full">
      <div className={moveHeader()}>
        <div
          id="inner"
          className="flex justify-between text-zinc-400 items-center max-w-7xl h-full py-3.5 pr-9 pl-9 box-border mr-auto ml-auto"
        >
          <a id="logo" className="w-36">
            <Link href="/">
              <span className="hover:text-white cursor-pointer">Logo</span>
            </Link>
          </a>
          <div id="h-tab" className="flex justify-between w-52">
            <Link href="/counter">
              <span className="hover:text-white cursor-pointer">Counter</span>
            </Link>
            <Link href="/markets">
              <span className="hover:text-white cursor-pointer">markets</span>
            </Link>
            <Link href="/testzk">
              <span className="hover:text-white cursor-pointer">testzk</span>
            </Link>
          </div>
          {}
          <div id="h-btn" className="flex flex-nowrap justify-between w-64">
            <a onClick={() => clickModalBtn('gnb')} className="mr-3 mt-3 hover:text-white cursor-pointer">
              Gnb
            </a>
            <a onClick={() => clickModalBtn('join')} className="mr-3 mt-3 hover:text-white cursor-pointer">
              Join
            </a>
            <a className="mr-3 mt-3 hover:text-white cursor-pointer">Click to Connect wallet: MetaMask</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
