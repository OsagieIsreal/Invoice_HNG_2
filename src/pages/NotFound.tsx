import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error: route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <VStack spacing={6} py={20} textAlign="center">
      <Heading size="2xl">404</Heading>
      <Text color="#888EB0">The page you’re looking for doesn’t exist.</Text>
      <Box>
        <Button as={RouterLink} to="/" variant="primary">
          Back to Invoices
        </Button>
      </Box>
    </VStack>
  );
};

export default NotFound;
