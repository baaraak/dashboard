import { useMediaQuery } from "@chakra-ui/media-query";

export default function useSmallScreen() {
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");
  return isSmallScreen;
}
