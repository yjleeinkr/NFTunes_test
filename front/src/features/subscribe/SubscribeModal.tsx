import { useAppDispatch, useAppSelector } from '../../hooks/exhook';
import useWeb3 from '../../hooks/useWeb3';
import { userState, subscribeAsync } from '../user/userSlice';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
} from '@chakra-ui/react';

const Subscribe = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const user = useAppSelector(userState);
  const subState = user.userInfo.subscribeState;
  const { account } = useWeb3();
  console.log('account', account);
  const dispatch = useAppDispatch();

  const sub = async () => {
    try {
      let result = await dispatch(subscribeAsync(account));
      console.log('result임?', result);
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: result.payload.from,
            to: result.payload.to,
            value: result.payload.value,
          },
        ],
      });
      if (result.type === 'user/subscribe/fulfilled') {
        console.log('확인');
        if (user.userInfo.subscribeState) {
          alert('구독 완료');
          window.location.href = '/';
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {subState ? (
        <span className="cursor-pointer">구독취소하기</span>
      ) : (
        <>
          <span className="cursor-pointer" onClick={onOpen}>
            구독하기
          </span>
          <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
            <ModalOverlay />
            <ModalContent bgColor="gray" h="300">
              <ModalHeader color="white">Subscribe</ModalHeader>
              <ModalCloseButton />
              <ModalBody fontSize="2xl" color="white" fontWeight="bold" lineHeight="160%">
                <p>매월 "1ETH"</p>
                <p>여러 아티스트들의 다양한 음악을 들어보세요!</p>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="yellow" mr={3}>
                  <div onClick={sub}>구독하기</div>
                </Button>
                <Button colorScheme="gray" variant="ghost" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default Subscribe;
