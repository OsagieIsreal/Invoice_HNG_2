import { Box, Flex, Text } from "@chakra-ui/react";
import type { InvoiceStatus } from "@/types/invoice";
import { useColorMode } from "@chakra-ui/react";

const map = {
  draft: { color: "#373B53", label: "Draft", lightBg: "rgba(55,59,83,0.06)", darkBg: "rgba(223,227,250,0.06)", lightText: "#373B53", darkText: "#DFE3FA" },
  pending: { color: "#FF8F00", label: "Pending", lightBg: "rgba(255,143,0,0.06)", darkBg: "rgba(255,143,0,0.06)", lightText: "#FF8F00", darkText: "#FF8F00" },
  paid: { color: "#33D69F", label: "Paid", lightBg: "rgba(51,214,159,0.06)", darkBg: "rgba(51,214,159,0.06)", lightText: "#33D69F", darkText: "#33D69F" },
} as const;

const StatusBadge = ({ status }: { status: InvoiceStatus }) => {
  const { colorMode } = useColorMode();
  const m = map[status];
  return (
    <Flex
      align="center"
      justify="center"
      gap={2}
      bg={colorMode === "dark" ? m.darkBg : m.lightBg}
      color={colorMode === "dark" ? m.darkText : m.lightText}
      px={4}
      py={2}
      borderRadius="6px"
      minW="104px"
      h="40px"
      fontWeight={700}
      fontSize="xs"
    >
      <Box w="8px" h="8px" borderRadius="full" bg={m.color} />
      <Text>{m.label}</Text>
    </Flex>
  );
};

export default StatusBadge;
