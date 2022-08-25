import { useEffect, useState } from 'react';
import useWeb3 from '../../hooks/useWeb3';
import { useAppSelector, useAppDispatch } from '../../hooks/exhook';
import { joinAsync, userState } from './userSlice';
import Login from './Login';

const Join = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userState);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const { web3, account, networkId } = useWeb3();

  const submitUserInfo = () => {
    const userInfo = {
      nickname,
      email,
      account,
    };
    dispatch(joinAsync(userInfo));
    setNickname('');
    setEmail('');
  };

  useEffect(() => {
    if (user.userInfo.account !== '') {
      window.location.href = '/';
    }
  }, [user]);

  return (
    <div>
      <></>
      <input
        type="text"
        name="nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        style={{ background: 'yellow' }}
      />
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ background: 'red' }}
      />
      <button onClick={submitUserInfo}>join</button>
      {/* {user.userInfo.account === '' ? (
        <p>닉네임과 이메일을 입력해주세요</p>
      ) : user.isNew ? (
        <div>
          <p> {user.userInfo.account} 로 가입 완료되었습니다.</p>
          <Login />
        </div>
      ) : (
        <div>
          <p> {user.userInfo.account} 로 이미 가입되어있습니다. </p>
        </div>
      )} */}
    </div>
  );
};

export default Join;
