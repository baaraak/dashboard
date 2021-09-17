import {
  Divider,
  Spacer,
  Stack,
  IconButton,
  LinkBox,
  Tooltip,
  LinkOverlay,
  Text,
  Link,
  Icon,
  BoxProps,
  IconButtonProps,
  useMediaQuery,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { IconType } from "react-icons/lib";
import { AppRoutes } from "pages/routes";

type UseDisclosureProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: UseDisclosureProps) => {
  const location = useLocation();

  const NavAction = isOpen ? CollapsedItem : NavItem;

  const [isSmallScreen] = useMediaQuery("(max-width: 1460px)");

  if (isSmallScreen) return <MobileSidebar isOpen={isOpen} onClose={onClose} />;

  return (
    <Stack
      rounded="xl"
      w={isOpen ? "60px" : "300px"}
      transition="width .4s ease-in-out"
      py={8}
      bg="white"
      shadow="md"
      position="sticky"
      top="6rem"
      fontSize="sm"
      height="fit-content"
      display={["none", "initial", "initial"]}
      overflowX={isOpen ? "initial" : "clip"}
      divider={<Divider m="0 !important" />}
    >
      {AppRoutes.map((route) => (
        <NavAction
          key={`nav-item-${route.id}`}
          active={location.pathname === route.path}
          name={route.name}
          path={route.path}
          icon={route.icon}
        />
      ))}
    </Stack>
  );
};

export default Sidebar;

const MobileSidebar = ({ isOpen, onClose }: UseDisclosureProps) => {
  const location = useLocation();

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay display={["initial", "initial", "none"]}>
        <DrawerContent layerStyle="neutral" py={8}>
          <Stack spacing={2} fontSize="sm">
            <DrawerCloseButton />
            {AppRoutes.map((route) => (
              <NavItem
                key={`nav-item-${route.id}`}
                active={location.pathname === route.path}
                name={route.name}
                path={route.path}
                icon={route.icon}
              />
            ))}
          </Stack>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

const CollapsedItem = (props: {
  scheme?: IconButtonProps["colorScheme"];
  icon: IconType;
  active?: boolean;
  path: string;
  onClick?: () => void;
  name: string;
}) => {
  return (
    <Tooltip hasArrow label={props.name} placement="right">
      <LinkBox display="flex" justifyContent="center">
        <IconButton
          colorScheme={props.active ? "brand" : props.scheme}
          aria-label={props.name}
          variant={props.active ? "solid" : "ghost"}
          boxSize="40px"
          alignSelf="center"
          _focus={{ shadow: "none" }}
          icon={
            <>
              <Link to={props.path} as={RouterLink}>
                <LinkOverlay>
                  <Icon as={props.icon} fontSize="lg" />
                </LinkOverlay>
              </Link>
            </>
          }
        />
      </LinkBox>
    </Tooltip>
  );
};

export type NavItemProps = {
  icon: IconType;
  active?: boolean;
  path: string;
  name: string;
  onClick?: () => void;
};
const NavItem = (props: NavItemProps) => {
  const activeProps: BoxProps = {
    borderRightColor: "blue.800",
    bg: "gray.100",
    color: "black",
  };

  return (
    <Link to={props.path} as={RouterLink} textDecoration="none">
      <Stack
        direction="row"
        cursor="pointer"
        px={8}
        py={6}
        spacing={4}
        alignItems="center"
        transition="all .4s ease-in-out"
        borderRightWidth="5px"
        borderRightColor="transparent"
        _hover={activeProps}
        {...(props.active && activeProps)}
      >
        <Icon as={props.icon} fontSize="xl" />

        <Text>{props.name}</Text>
        <Spacer />
      </Stack>
    </Link>
  );
};
