import React, { useState } from 'react';

const Wrap = (props) => {

  const [isWheel,setIsWheel] = useState<string>('translate-y-0')
  /**
   * @param {e} e `onWheel` 마우스 조작 이벤트
   * */
  const eventWheel = (e) => {
    if (e.nativeEvent.deltaY > 0) {
      setIsWheel('-translate-y-full')
    } else {
      setIsWheel('translate-y-0')
    }
  }

  const InnerChildren = () => (
    React.Children.map(props.children,(child)=>{
      return React.cloneElement(child,{
        isWheel: isWheel
      })
    })
  )

  return (
      <div id="wrap"
        className="w-full h-full bg-black overflow-y-scroll"
        onWheel={(e)=>{eventWheel(e)}}
      >

        {<InnerChildren />}
      </div>
  )
}

export default Wrap
