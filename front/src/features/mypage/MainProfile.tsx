import { useAppSelector } from '../../hooks/exhook';
import { userState } from '../user/userSlice';
import { useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  Button,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  Box,
  Flex,
} from '@chakra-ui/react';
import Link from 'next/link';
import Subscribe from '../subscribe/SubscribeModal';

const MainProfile = () => {
  const user = useAppSelector(userState);

  return (
    <>
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Flex w="70px" cursor="pointer" justify="space-between" align="center">
            <img
              className="w-10 h-10 rounded-full flex"
              src={user.userInfo.avatar === '' ? 'http://localhost:4000/upload/user.png' : user.userInfo.avatar}
            />
          </Flex>
        </PopoverTrigger>
        <Portal>
          <PopoverContent
            w="200px"
            bgColor="rgb( 10 10 10 / 0.8)"
            color="white"
            borderColor="white"
            ringColor="black"
            overflow="hidden"
          >
            <PopoverArrow />
            <PopoverHeader className="font-bold">
              {user.userInfo.nickname === '' ? 'Guest' : user.userInfo.nickname}
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody className="hover:bg-emerald-900">
              <Link href={`/mypage/${user.userInfo.account}`}>
                <span className="cursor-pointer">Dash board</span>
              </Link>
            </PopoverBody>
            <PopoverBody className="hover:bg-emerald-900">
              <Link href={`/mypage/registermusic`}>
                <span className="cursor-pointer">Upload Music</span>
              </Link>
            </PopoverBody>
            <PopoverBody className="hover:bg-emerald-900">
              <Subscribe />
            </PopoverBody>
            <PopoverFooter>This is the footer</PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
};

export default MainProfile;
