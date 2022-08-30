import { ScaleFade, useDisclosure, Button, Box } from '@chakra-ui/react';

export default function ScaleFadeEx() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Button colorScheme="orange" size="lg" onClick={onToggle}>
        Click Me
      </Button>
      <ScaleFade initialScale={0.9} in={isOpen}>
        <Box p="40px" color="white" mt="4" bg="teal.500" rounded="md" shadow="md">
          Fade
        </Box>
      </ScaleFade>
    </>
  );
}
