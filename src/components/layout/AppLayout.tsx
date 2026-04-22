import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AppLayout = () => (
  <Flex direction={{ base: "column", lg: "row" }} minH="100vh">
    <Sidebar />
    <Box
      as="main"
      flex={1}
      pl={{ base: 0, lg: "103px" }}
      px={{ base: 6, md: 12, lg: 0 }}
      py={{ base: 8, md: 14, lg: 18 }}
    >
      <Box maxW="730px" mx="auto" px={{ lg: 4 }}>
        <Outlet />
      </Box>
    </Box>
  </Flex>
);

export default AppLayout;
