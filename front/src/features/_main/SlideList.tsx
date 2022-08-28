import i1 from '../../../public/images/i1.jpg'
import i2 from '../../../public/images/i2.jpg'
import i3 from '../../../public/images/i3.jpg'
import i4 from '../../../public/images/i4.jpg'
import Image from 'next/image';
import { useEffect, useState } from 'react';

const SlideList = () => {

  const tempArr = [i1,i4,i2,i3,i1,i2]

  const [imgWidth,setImgWidth] = useState<number>(0)
  const [imgTranslateX,setImgTranslateX] = useState<number>(0)
  const [valueX,setValueX] = useState<number>(0)
  const [slideImg, setSlideImg] = useState<string>('translate-x-[320rem]')

  const slideHandler = (d) => {
    let valueX
    switch(d) {
      case 'right':
        valueX = imgTranslateX + imgWidth
        setImgTranslateX(valueX)
        setValueX(parseInt(String(valueX / 16)))
        console.log('오른밸류',parseInt(String(valueX / 16)),'rem')
        break;
      case 'left':
        valueX = imgTranslateX - imgWidth
        setImgTranslateX(valueX)
        setValueX(parseInt(String(valueX / 16)))
        console.log('왼밸류',parseInt(String(valueX / 16)),'rem')
        break;
    }
  }
  useEffect(() =>{
    let renderedWidth

    setImgWidth(
      window.onload = () => {
      // imgWidth = document.querySelector('#slideBox').clientWidth;
      renderedWidth = document.querySelector('#slideBox').clientWidth
      return renderedWidth
    })
  },[])

  useEffect(()=>{
    console.log("useEffect_imgTranslate",imgWidth)
    if (valueX >= 0) {
      console.log('오른')
      setSlideImg(`translate-x-[${imgTranslateX}rem]`)
      console.log(slideImg)
    } else if (valueX < 0 ) {
      console.log('왼')
      setSlideImg(`-translate-x-[${imgTranslateX}rem]`)
      console.log(slideImg)
    }
  },[imgTranslateX])

  return (
    <>
      <div id="buttonWrap" className="flex justify-end">
        <div id="slideButton" onClick={()=>{ slideHandler('left') } }
          className="text-zinc-400 mr-5 cursor:pointer">
          <span>
            왼쪽
          </span>
        </div>
        <div id="slideButton" onClick={()=>{ slideHandler('right') }}
             className="text-zinc-400 mr-5 cursor:pointer">
          <span>
            오른쪽
          </span>
        </div>
      </div>
      <div id='test' className={` relative border h-[32rem] p-5 flex ${slideImg}`}>
      {/*<div id='test' className={` relative border h-[32rem] p-5 flex translate-x-[400rem]`}>*/}
        {
          tempArr.map(v=>{
            return (
              <div id="slideBox" className={ ` relative w-1/3 h-full shrink-0 mr-10 ` }>
              {/*<div id="slideBox" className={ ` relative w-1/3 h-full shrink-0 mr-10 translate-x-[12rem]` }>*/}
                <Image src={v} layout='fill' className="" ></Image>
              </div>
            )
          })
        }
      </div>
    </>
  )
}
export default SlideList
