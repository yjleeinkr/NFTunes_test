import { useAppSelector, useAppDispatch } from '../../hooks/exhook';
import { userState, loginAsync } from './userSlice';

const Login = () => {
  const user = useAppSelector(userState);
  const dispatch = useAppDispatch();

  const loginUser = async () => {
    if (!window.ethereum) throw new Error('Error : no metamask');
    const [account]: string[] = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    dispatch(loginAsync(account));
  };
  return <button onClick={loginUser}>LOGIN</button>;
};

export default Login;
