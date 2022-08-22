const Header = ( { eventProps } ) => {

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
      fixed ${temp} w-full h-[5.5rem] bg-gradient-to-b from-teal-300/50 transition duration-500 ease
      `
    )
  }
  return(
    <div className={header()}>
      <div id="inner" className="flex justify-between items-center w-full h-full py-3.5 pr-9 pl-9 box-border mr-auto ml-auto">
        <a id="logo" className="">
          <span>Logo</span>
        </a>
        <div id="h-tab" className="flex justify-between w-52">
          <a>탭</a>
          <a>탭2</a>
          <a>탭3</a>
        </div>
        <div id="h-btn" className="">
          <a>메뉴2</a>
        </div>
      </div>
    </div>
  )
}

export default Header
