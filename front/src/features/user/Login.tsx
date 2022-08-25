import { useAppSelector, useAppDispatch } from '../../hooks/exhook';
import useWeb3 from '../../hooks/useWeb3';
import { userState, loginAsync, logout } from './userSlice';

const Login = () => {
  const user = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const { account } = useWeb3();
  console.log(user);

  const loginUser = async () => {
    console.log(account);

    dispatch(loginAsync(account));
    console.log('dispatch');
    if (user.isNew === true && user.isLogin === false) {
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
