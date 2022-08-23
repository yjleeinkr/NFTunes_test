import { useState } from 'react';
/**
 * @todo 각 페이지 인덱스에 Header 컴포넌트 추가해주고 onWheel 이벤트도 넣어줘야 동작함
 * */
export const useWheels = () => {
  const [isWheel,setIsWheel] = useState<number>(-1)
  /**
   * @param {e} e `onWheel` 마우스 조작 이벤트
   * */
  const eventWheel = (e) => {
    if (e.nativeEvent.deltaY > 0) {
      setIsWheel(e.nativeEvent.deltaY)
    } else {
      setIsWheel(e.nativeEvent.deltaY)
    }
  }

  return {
    isWheel, eventWheel
  }
}
