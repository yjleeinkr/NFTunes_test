import { useWheels } from '../../hooks/useWheel';
import React from 'react';
import { useAppSelector } from '../../hooks/exhook';
import { scrollCount } from '../../modules/modalSlice';
import { loginAsync } from '../user/userSlice';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/exhook';

const Wrap = (props) => {
  const dispatch = useAppDispatch();
  const callback = (accounts: string[]) => {
    dispatch(loginAsync(accounts[0]));
  };

  useEffect(() => {
    window.ethereum?.on('accountsChanged', callback);
    return () => {
      window.ethereum?.removeListener('accountsChanged', callback);
    };
  }, []);

  const count = useAppSelector(scrollCount);

  const { isWheel, eventWheel } = useWheels(count);

  const InnerChildren = () =>
    React.Children.map(props.children, (child) => {
      return React.cloneElement(child, {
        isWheel: isWheel,
      });
    });
  return <div className="w-full h-full bg-black snap-y snap-mandatory overflow-y-scroll">{<InnerChildren />}</div>;
};

export default Wrap;
