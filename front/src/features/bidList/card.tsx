import styled from 'styled-components';
import Image from 'next/image';

const CardWrap = styled.span`
  background-color: white;
  display: inline-block;
  width: 100px;
  height: 100px;
  margin: 5px 5px;
  transform: skew(25rad) translateX(-5px);
  border-radius: 10px;
  overflow: hidden;

  &:hover {
    transform: skew(25rad) scale(1.2);
    transition: 0.2s linear;
    z-index: 2;
  }
`;

const Card = ({ url, id }) => {
  return (
    <>
      <CardWrap id={id}>
        <Image src={url} width="100%" height="100%" objectFit="cover" />
        <span className="text-white">hi</span>
      </CardWrap>
    </>
  );
};

export default Card;
