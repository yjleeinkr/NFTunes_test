import axios from 'axios';
import type { NextApiHandler } from 'next';

const handleLogin: NextApiHandler = async (req, res) => {
  const { account } = req.body;
  try {
    const response = await axios.post('http://localhost:4000/api/user/login', { account });
    console.log(response.data);
    res.send(response.data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

export default handleLogin;
