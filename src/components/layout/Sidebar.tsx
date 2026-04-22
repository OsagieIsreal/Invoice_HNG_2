import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useThemeStore } from "@/store/useThemeStore";

const Logo = () => (
  // simple inline SVG version of the FM logo
  <Box position="relative" w="full" h="full" overflow="hidden" borderTopRightRadius="20px" borderBottomRightRadius="20px">
    <Box
      position="absolute"
      inset={0}
      bgGradient="linear(135deg, #7C5DFA 0%, #9277FF 100%)"
    />
    <Box
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      h="50%"
      bg="#9277FF"
      borderTopLeftRadius="20px"
    />
    <Flex position="relative" h="full" align="center" justify="center">
      <Image
        src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><path fill='white' d='M20 0a20 20 0 1 0 0 40 20 20 0 0 0 0-40zm0 8.5L31.5 20 20 31.5 8.5 20 20 8.5z'/></svg>"
        alt="Logo"
        w="28px"
        h="28px"
      />
    </Flex>
  </Box>
);

const Sidebar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const toggleStore = useThemeStore((s) => s.toggleTheme);

  const handleToggle = () => {
    toggleColorMode();
    toggleStore();
  };

  return (
    <Flex
      as="header"
      position={{ base: "static", lg: "fixed" }}
      top={0}
      left={0}
      bg={colorMode === "dark" ? "#1E2139" : "#373B53"}
      w={{ base: "full", lg: "103px" }}
      h={{ base: "72px", md: "80px", lg: "100vh" }}
      direction={{ base: "row", lg: "column" }}
      align="center"
      justify="space-between"
      zIndex={20}
      borderRadius={{ base: 0, lg: "0 20px 20px 0" }}
    >
      <Box w={{ base: "72px", md: "80px", lg: "103px" }} h={{ base: "72px", md: "80px", lg: "103px" }}>
        <Logo />
      </Box>
      <Flex
        align="center"
        direction={{ base: "row", lg: "column" }}
        gap={{ base: 4, md: 6 }}
        pr={{ base: 4, md: 6, lg: 0 }}
        pb={{ lg: 6 }}
      >
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          variant="ghost"
          color="#858BB2"
          _hover={{ color: "white", bg: "transparent" }}
          onClick={handleToggle}
        />
        <Box
          display={{ base: "none", lg: "block" }}
          w="full"
          h="1px"
          bg="#494E6E"
        />
        <Box
          display={{ base: "block", lg: "none" }}
          w="1px"
          h="80px"
          bg="#494E6E"
        />
        <Avatar
          size="sm"
          name="User"
          src="https://shorturl.at/qDYp0"
          mr={{ lg: 0 }}
          mb={{ lg: 0 }}
        />
      </Flex>
    </Flex>
  );
};

export default Sidebar;
