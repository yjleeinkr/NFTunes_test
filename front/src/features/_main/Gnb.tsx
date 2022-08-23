import { useAppDispatch, useAppSelector } from '../../hooks/exhook';
import { gnbCount, handleGnb } from './gnbSlice';

/* -top 속성으로 화면 옮김 */
const Gnb = () => {
  const dispatch = useAppDispatch()
  const topProperty = useAppSelector(gnbCount)

  return(
    <div className={`fixed ${topProperty} bg-slate-400 w-full h-screen left-0 right-auto bottom-auto `}>
      <a onClick={() => dispatch(handleGnb())}>gnbTest</a>
    </div>
  )
}

export default Gnb
