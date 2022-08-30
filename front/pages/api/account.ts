import axios from 'axios';

export async function getUserInfo() {
  const res = await axios.post('http://localhost:4000/api/user/getAllUserInfo');
  return res.data;
}

export async function getUserByAcct(acct: string) {
  const res = await axios.get(`http://localhost:4000/api/user/details/${acct}`);
  console.log(res.data);
  return res.data;
}
