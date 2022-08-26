import { useAppSelector, useAppDispatch } from '../../hooks/exhook';
import useWeb3 from '../../hooks/useWeb3';
import { useEffect, useState } from 'react';
import { userState, loginAsync, logout } from './userSlice';

const Login = () => {
  const user = useAppSelector(userState);
  const [isFirst, setIsFirst] = useState(true);
  const dispatch = useAppDispatch();
  const { account } = useWeb3();

  const loginUser = async () => {
    if (user.isNew === 'true') {
      window.location.href = '/user/join';
    }
    if (user.isNew === 'untracked') {
      dispatch(loginAsync(account));
      setIsFirst(false);
    }
  };

  const logoutUser = async () => {
    dispatch(logout());
    localStorage.removeItem('user');
    alert('로그아웃 완료');
  };

  useEffect(() => {
    if (!isFirst) {
      window.location.href = '/user/join';
    }
  }, [isFirst]);

  return (
    <div className="pt-20 m-36 snap-start flex-shrink-0">
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
