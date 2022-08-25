import { useAppSelector, useAppDispatch } from '../../hooks/exhook';
import { userState, loginAsync, logout } from './userSlice';

const Login = () => {
  const user = useAppSelector(userState);
  const dispatch = useAppDispatch();
  console.log(user);

  const loginUser = async () => {
    if (!window.ethereum) throw new Error('Error : no metamask');
    const [account]: string[] = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    dispatch(loginAsync(account));
    if (user.isNew && !user.isLogin) {
      alert('회원가입창으로 이동');
      window.location.href = '/user/join';
    }
  };

  const logoutUser = async () => {
    dispatch(logout());
    localStorage.removeItem('user');
    alert('로그아웃 완료');
  };

  return (
    <div>
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
