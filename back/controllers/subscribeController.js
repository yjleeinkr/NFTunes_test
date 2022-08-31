const User = require('../models/userModel');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
const SubscribeContract = require('../../truffle/build/contracts/Subscribe.json');
const { db } = require('../models/userModel');
const { now } = require('mongoose');

exports.subscribe = async (req, res) => {
  const { account } = req.body;

  const networkId = await web3.eth.net.getId();
  const to = SubscribeContract.networks[networkId].address;

  const abi = SubscribeContract.abi;

  const deployed = new web3.eth.Contract(abi, to);
  //   const data = await deployed.methods.subscribe();
  //   //   console.log(data);

  //   const owner = await User.find({
  //     account,
  //   });
  //   console.log('owner', owner);
  let txObject;
  try {
    const filter = { account };
    const update = { subscribeTimestamp: now(), subscribeState: true };

    const result = await User.findOneAndUpdate(filter, update);
    txObject = {
      from: account,
      to,
      value: web3.utils.toWei('1', 'ether'),
      result,
    };
  } catch (e) {
    console.error(e);
  }

  res.json(txObject);
};
