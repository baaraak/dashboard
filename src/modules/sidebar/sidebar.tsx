import {
  Divider,
  Spacer,
  Stack,
  Text,
  Link,
  Icon,
  BoxProps,
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

  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

  if (isSmallScreen) return <MobileSidebar isOpen={isOpen} onClose={onClose} />;

  return (
    <Stack
      rounded="xl"
      minW={{ md: "200px", lg: "270px" }}
      transition="width .4s ease-in-out"
      py={8}
      bg="white"
      shadow="md"
      position="sticky"
      top="6rem"
      fontSize="sm"
      height="fit-content"
      display={["none", "initial", "initial"]}
      divider={<Divider m="0 !important" />}
    >
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

        <Text
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          overflow="hidden"
          title={props.name}
        >
          {props.name}
        </Text>
        <Spacer />
      </Stack>
    </Link>
  );
};
