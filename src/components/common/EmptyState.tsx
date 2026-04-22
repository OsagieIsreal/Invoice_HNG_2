import { Box, Heading, Text, VStack } from "@chakra-ui/react";

const EmptyIllustration = () => (
  <svg width="241" height="200" viewBox="0 0 241 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M120.5 0a120 120 0 1 1 0 240 120 120 0 0 1 0-240zm0 24a96 96 0 1 0 0 192 96 96 0 0 0 0-192z" fill="#7C5DFA" fillOpacity="0.08"/>
    <rect x="60" y="70" width="120" height="14" rx="4" fill="#7C5DFA" fillOpacity="0.5"/>
    <rect x="60" y="100" width="80" height="10" rx="3" fill="#7C5DFA" fillOpacity="0.3"/>
    <rect x="60" y="120" width="100" height="10" rx="3" fill="#7C5DFA" fillOpacity="0.3"/>
    <rect x="60" y="140" width="60" height="10" rx="3" fill="#7C5DFA" fillOpacity="0.3"/>
  </svg>
);

const EmptyState = () => (
  <VStack spacing={10} mt={{ base: 16, md: 24 }} px={6} textAlign="center">
    <Box><EmptyIllustration /></Box>
    <VStack spacing={6} maxW="220px">
      <Heading as="h2" size="md" letterSpacing="-0.5px">
        There is nothing here
      </Heading>
      <Text fontSize="xs" color="#888EB0" lineHeight="1.6">
        Create an invoice by clicking the <b>New</b> button and get started
      </Text>
    </VStack>
  </VStack>
);

export default EmptyState;
