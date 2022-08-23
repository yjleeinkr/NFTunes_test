import { useAppDispatch, useAppSelector } from '../../hooks/exhook';
import { gnbCount, handleGnb } from './gnbSlice';
import Top5Tab from './gnbTab/top5Tab';
import Link from 'next/link';

/* -top 속성으로 화면 옮김 */
const Gnb = () => {
  const dispatch = useAppDispatch()
  const topProperty = useAppSelector(gnbCount)

  return(
    <div className={ `fixed w-full h-screen bg-black ${topProperty} `}>
      <div id="gnb-inner" className="mx-auto flex justify-between max-w-7xl text-zinc-400 h-full left-0 right-auto bottom-auto">
        <div id="gnb-pageTab1" className="flex flex-col w-2/5 p-12">
          <Top5Tab cate = {'music'}/>
        </div>
        <div id="gnb-pageTab2" className="flex flex-col w-2/5 p-12">
          <Top5Tab cate = {'auction'}/>
        </div>
        <div id="gnb-userTab" className=" w-1/5 p-12">
          <a onClick={() => dispatch(handleGnb())}>gnbTest</a>
        </div>
      </div>
    </div>
  )
}

export default Gnb
