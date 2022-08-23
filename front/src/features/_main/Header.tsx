import { useRouter } from 'next/router'

const Header = ( { eventProps } ) => {
  let router = useRouter();

  console.log(router)

  let amount
  if (eventProps > 0) {
    amount = -100
  } else if (eventProps < 0 ) {
    amount = 100
  }

  const header = () => {
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

  const tabs = () => {
    for (let i; i<=3; i++) {

    }
  }

  return(
    <div className={header()}>
      <div id="inner" className="flex justify-between text-zinc-400 items-center w-full h-full py-3.5 pr-9 pl-9 box-border mr-auto ml-auto">
        <a id="logo" className="">
          <span>Logo</span>
        </a>
        <div id="h-tab" className="flex justify-between w-52">
          <a className="hover:text-white cursor-pointer">탭 1 임</a>
          <a className="hover:text-white cursor-pointer">탭 2 임</a>
          <a className="hover:text-white cursor-pointer">탭 3 임</a>
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
