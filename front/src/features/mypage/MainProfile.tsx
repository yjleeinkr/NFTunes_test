import { useAppSelector } from '../../hooks/exhook';
import { userState } from '../user/userSlice';
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
} from '@chakra-ui/react';

const MainProfile = () => {
  const user = useAppSelector(userState);
  return (
    <Popover>
      <PopoverTrigger>
        <Button>
          <img
            className="w-10 h-10 rounded-full flex"
            src={user.userInfo.avatar === '' ? 'http://localhost:4000/upload/user.png' : user.userInfo.avatar}
            alt="Rounded avatar"
          />
          <span>{user.userInfo.nickname}</span>
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Header</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Button colorScheme="blue">Button</Button>
          </PopoverBody>
          <PopoverFooter>This is the footer</PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default MainProfile;
