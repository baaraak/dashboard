import { Button, Flex, Stack, Text, IconButton, Icon } from "@chakra-ui/react";
import { CgClose, CgMenu } from "react-icons/cg";

import { useAuth } from "context/auth";

type Props = {
  onToggle: () => void;
  isOpen: boolean;
};

const Header = ({ onToggle, isOpen }: Props) => {
  const { user } = useAuth();

  const icon = isOpen ? CgClose : CgMenu;

  return (
    <Flex
      layerStyle="card"
      h="4.5rem"
      bg="white"
      shadow="sm"
      position="sticky"
      top="0"
      zIndex="10"
      alignItems="center"
      p={5}
    >
      <Stack direction="row" w="full" alignItems="center">
        <IconButton
          colorScheme="brand"
          variant="ghost"
          fontSize="2xl"
          aria-label="Toggle Actions"
          icon={<Icon as={icon} />}
          transition="all .4s ease-in-out"
          onClick={onToggle}
        />

        <Stack direction="row" alignItems="center">
          <Flex direction="column" lineHeight="5">
            <Text fontSize="lg" fontWeight="semibold" textStyle="default">
              רולדין - ראש העין
            </Text>
            <Text fontSize="sm" color="gray.500">
              מחובר באמצעות: {user?.username}
            </Text>
          </Flex>
        </Stack>
      </Stack>
      <Button variant="outline" size="sm">
        התנתק
      </Button>
    </Flex>
  );
};

export default Header;
