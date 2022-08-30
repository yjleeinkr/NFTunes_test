import { useEffect } from 'react';
import useWeb3 from '../src/hooks/useWeb3';

const test = () => {
  const { web3, networkId } = useWeb3();

  if (!web3) return;
  const subscribeJSON = require('../../truffle/build/contracts/Subscribe_yj.json');
  const abi = subscribeJSON.abi;
  const ca: string = subscribeJSON.networks[networkId]?.address;

  const instance = new web3.eth.Contract(abi, ca);
  console.log('sub', subscribeJSON);

  return <div>hello</div>;
};

export default test;
