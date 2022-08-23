import Link from 'next/link';

const Top5Tab = (props) => {
  console.log(props.cate)
  const tempArr = ['auction1','auction2','auction3','auction4','auction5']
  const tempArr2 = ['music1','music2','music3','music4','music5']


  const musicList = () => {
    return tempArr2.map((v)=>{
      return <Link href="/">{v}</Link>
    })
  }

  const auctionList = () => {
    return tempArr.map((v)=>{
        return <Link href="/">{v}</Link>
    })
  }

  switch (props.cate) {
    case 'music':
      return (
        <>
          <Link href="/">Music Top 5</Link>
          {musicList()}
        </>
      )
    case 'auction':
      return (
        <>
          <Link href="/">Auction Top 5</Link>
          {auctionList()}
        </>
      )
    default:
      console.log('wtf')
  }
}

export default Top5Tab
