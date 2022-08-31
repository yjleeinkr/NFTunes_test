import { NextPage } from 'next';
import Head from 'next/head';
import Subscribe from '../../src/features/subscribe/Subscribe';
import styled from 'styled-components';

const SubscribePage: NextPage = () => {
  return (
    <>
      <div className="pr-10 pl-10 pt-20 mt-5 pb-5 mb-5 "></div>
      <div>hello world</div>
      <Subscribe />
    </>
  );
};
export default SubscribePage;
