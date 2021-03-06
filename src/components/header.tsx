import {
  Button,
  Flex,
  Stack,
  Text,
  IconButton,
  Icon,
  useMediaQuery,
} from "@chakra-ui/react";
import { CgClose, CgMenu } from "react-icons/cg";

type Props = {
  onToggle: () => void;
  logout: () => void;
  isOpen: boolean;
  username?: string;
};

const Header = ({ onToggle, isOpen, username, logout }: Props) => {
  const icon = isOpen ? CgClose : CgMenu;
  const [isSmallScreen] = useMediaQuery("(max-width: 1024px)");

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
          display={isSmallScreen ? "block" : "none"}
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
              מחובר באמצעות: {username}
            </Text>
          </Flex>
        </Stack>
      </Stack>
      <Button variant="outline" size="sm" onClick={logout}>
        התנתק
      </Button>
    </Flex>
  );
};

export default Header;
