const User = require('../models/userModel');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
const SubscribeContract = require('../../truffle/build/contracts/Subscribe.json');
const { db } = require('../models/userModel');
const { now } = require('mongoose');

exports.subscribe = async (req, res) => {
  const { account } = req.body.userInfo;
  console.log('back', account);

  const networkId = await web3.eth.net.getId();
  const to = SubscribeContract.networks[networkId].address;
  const abi = SubscribeContract.abi;
  console.log('console', networkId, to, abi);

  const deployed = new web3.eth.Contract(abi, to);
  console.log('deploy', deployed);
  //   const data = await deployed.methods.subscribe();
  //   console.log(data);

  const time = User.find({
    subscribeTimestamp,
  });
  console.log('time', time);

  if (time.length === 0) {
    try {
      db.User.updateOne({}, { $set: { subscribeTimestamp: now() } }),
        db.User.updateOne({}, { $set: { subscribeState: true } });
    } catch (e) {
      console.error(e);
    }
  }

  let txObject = {
    from,
    to,
    data,
  };
  console.logG('back', txObject);

  res.json(txObject);
};
