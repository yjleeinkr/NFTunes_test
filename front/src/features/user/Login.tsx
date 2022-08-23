import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { userState } from './userSlice';

const Login = ({ children }) => {
  const user = useAppSelector(userState);

  const loginUser = async () => {
    console.log(user);
  };
  return <button onClick={loginUser}>{children}</button>;
};

export default Login;
