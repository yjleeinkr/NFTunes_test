import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/exhook';
import useWeb3 from '../../hooks/useWeb3';
import { userState, loginAsync, logout } from './userSlice';

const Login = () => {
  const user = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const { account } = useWeb3();
  const [acct, setAcct] = useState(account);
  console.log(account);

  const loginUser = async () => {
    dispatch(loginAsync(account));
    if (user.isNew === 'true') {
      window.location.href = '/user/join';
    }
  };

  const logoutUser = async () => {
    dispatch(logout());
    localStorage.removeItem('user');
    alert('로그아웃 완료');
  };

  useEffect(() => {
    window.ethereum?.on('accountsChanged', (accounts) => {
      dispatch(loginAsync(accounts[0]));
      setAcct(accounts[0]);
    });
  }, [acct]);

  return (
    <div className="pt-5 mt-5 mb-10 snap-start flex-shrink-0">
      {user.isLogin ? (
        <>
          <p>
            <button onClick={logoutUser}>LOGOUT</button>
          </p>
        </>
      ) : (
        <button onClick={loginUser}>LOGIN</button>
      )}
    </div>
  );
};

export default Login;
