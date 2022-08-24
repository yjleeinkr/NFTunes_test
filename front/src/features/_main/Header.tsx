import { useRouter } from 'next/router'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/exhook';
import { gnbCount, handleGnb } from './gnbSlice';

const Header = ( { eventProps } ) => {
  let router = useRouter();
  const dispatch = useAppDispatch()

  const moveHeader = () => {
    let temp
    if (eventProps < 0) {
      temp = 'translate-y-0'
    } else if (eventProps > 0) {
      temp = '-translate-y-full'
    }
    return (
      `
      fixed ${temp} w-full h-20 bg-gradient-to-b from-teal-300/50 transition duration-500 ease
      `
    )
  }

  return(
    <div className="w-full h-full">
      <div className={moveHeader()}>
        <div id="inner" className="flex justify-between text-zinc-400 items-center max-w-7xl h-full py-3.5 pr-9 pl-9 box-border mr-auto ml-auto">
          <a id="logo" className="w-36">
            <Link href="/"><span className="hover:text-white cursor-pointer">Logo</span></Link>
          </a>
          <div id="h-tab" className="flex justify-between w-52">
            <Link href="/counter"><span className="hover:text-white cursor-pointer">Counter</span></Link>
            <Link href="/markets"><span className="hover:text-white cursor-pointer">markets</span></Link>
            <Link href="/testzk"><span className="hover:text-white cursor-pointer">testzk</span></Link>
          </div>
          {

          }
          <div id="h-btn" className="flex justify-between w-36">
            <a onClick={() => dispatch(handleGnb())} className="hover:text-white cursor-pointer">Gnb</a>
            <a className="text-lime-400">현재 페이지: {router.pathname}</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
