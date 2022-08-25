import axios from 'axios';
import type { NextApiHandler } from 'next';

const handleJoin: NextApiHandler = async (req, res) => {
  const { userInfo } = req.body;
  try {
    const isJoined = await axios.post('http://localhost:4000/api/user/join', userInfo);
    if (isJoined.status !== 200) throw new Error('error from db');
    res.send(isJoined.data);
  } catch (err) {
    console.log(err);
  }
};

export default handleJoin;
