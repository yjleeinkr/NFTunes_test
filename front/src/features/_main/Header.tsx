import { useRouter } from 'next/router'
import Link from 'next/link';

const Header = ( { eventProps } ) => {
  let router = useRouter();

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
    <div className={moveHeader()}>
      <div id="inner" className="flex justify-between text-zinc-400 items-center w-full h-full py-3.5 pr-9 pl-9 box-border mr-auto ml-auto">
        <a id="logo" className="">
          <span>Logo</span>
        </a>
        <div id="h-tab" className="flex justify-between w-52">
          <Link href="/counter" className="hover:text-white cursor-pointer">Counter</Link>
          <Link href="/markets" className="hover:text-white cursor-pointer">markets</Link>
          <Link href="/testzk" className="hover:text-white cursor-pointer">testzk</Link>
        </div>
        {

        }
        <div id="h-btn" className="">
          <a>현재 페이지: {router.pathname}</a>
        </div>
      </div>
    </div>
  )
}

export default Header
