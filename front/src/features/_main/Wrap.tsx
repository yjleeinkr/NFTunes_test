import { useWheels } from '../../hooks/useWheel';
import React from 'react';
import { useAppSelector } from '../../hooks/exhook';
import { scrollCount } from '../../modules/modalSlice';

const Wrap = (props) => {

  const count = useAppSelector(scrollCount)

  const { isWheel, eventWheel } = useWheels(count);

  const InnerChildren = () => (
    React.Children.map(props.children,(child)=>{
      return React.cloneElement(child,{
        isWheel: isWheel
      })
    })
  )
  return (
    <div onWheel={ (e)=>{eventWheel(e)}}>
      {<InnerChildren />}
    </div>
  )
}

export default Wrap
