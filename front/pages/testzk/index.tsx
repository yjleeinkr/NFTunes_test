import Main from '../../src/features/zkSync/Main';
import Header from '../../src/features/_main/Header';
import { useWheels } from '../../src/hooks/useWheel';

export default function ZkMain() {

  const { isWheel, eventWheel } = useWheels()

  return (
    <div onWheel = {( e => eventWheel(e) )}>
      <Header eventProps = {isWheel} />
      <div className="pt-20 flex flex-col items-center justify-center min-h-screen py-2" >
        <Main />
      </div>
    </div>
  )
}
