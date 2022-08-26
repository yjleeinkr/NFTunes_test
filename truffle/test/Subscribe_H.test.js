const Subscribe = artifacts.require('Subscribe');
const Web3 = require('web3');

describe('Subscribe test', () => {
  let web3;
  let web3_1;
  let deployed;
  let account;
  it('연결테스트', () => {
    //   web3 = new Web3('http://127.0.0.1:8545') 옛날 문법. 요즘은 provider 사용.
    web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
    web3_1 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8546'));
  });

  it('전체 accounts 가져오기', async () => {
    [account] = await web3.eth.getAccounts();
    console.log(account);
  });

  it('balance 확인', async () => {
    const accountBalance = await web3.eth.getBalance(account);
    // const check = await web3.eth;
    console.log(accountBalance);
    // console.log('accountBalance :', accountBalance / 10 ** 18);
  });

  it('Subscribe deployed', async () => {
    deployed = await Subscribe.deployed(); //promise
  });

  it('find owner', async () => {
    const owner = deployed.methods.owner;
    const price = deployed.methods.sub_price;
    console.log(owner, price);
  });
});
