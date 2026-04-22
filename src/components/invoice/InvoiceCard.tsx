import { Box, Flex, Grid, Text, useColorMode } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import type { Invoice } from "@/types/invoice";
import StatusBadge from "@/components/common/StatusBadge";
import { formatCurrency, formatDate } from "@/utils";

const InvoiceCard = ({ inv }: { inv: Invoice }) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      as={RouterLink}
      to={`/invoice/${inv.id}`}
      bg={colorMode === "dark" ? "#1E2139" : "white"}
      borderRadius="8px"
      px={{ base: 6, md: 8 }}
      py={{ base: 6, md: 4 }}
      border="1px solid transparent"
      display="block"
      transition="border-color 0.2s"
      _hover={{ borderColor: "brand.500" }}
      boxShadow={colorMode === "light" ? "0 10px 10px -10px rgba(72,84,159,0.1)" : undefined}
    >
      <Grid
        display={{ base: "grid", md: "grid" }}
        templateColumns={{
          base: "1fr 1fr",
          md: "100px 130px 1fr 100px auto auto",
        }}
        templateRows={{ base: "auto auto", md: "auto" }}
        rowGap={{ base: 6, md: 0 }}
        columnGap={{ md: 4 }}
        alignItems="center"
      >
        <Text fontWeight={700} fontSize="sm">
          <Text as="span" color="#7E88C3">#</Text>
          {inv.id}
        </Text>
        <Text
          gridRow={{ base: "1", md: "auto" }}
          gridColumn={{ base: "2", md: "auto" }}
          textAlign={{ base: "right", md: "left" }}
          color={colorMode === "dark" ? "white" : "#7E88C3"}
          fontSize="sm"
          fontWeight={500}
        >
          Due {formatDate(inv.paymentDue)}
        </Text>
        <Text
          gridRow={{ base: "2", md: "auto" }}
          gridColumn={{ base: "1", md: "auto" }}
          color={colorMode === "dark" ? "#DFE3FA" : "#858BB2"}
          fontSize="sm"
          fontWeight={500}
        >
          {inv.clientName}
        </Text>
        <Text
          gridRow={{ base: "2", md: "auto" }}
          gridColumn={{ base: "2", md: "auto" }}
          textAlign={{ base: "right", md: "left" }}
          fontWeight={700}
        >
          {formatCurrency(inv.total)}
        </Text>
        <Box
          gridRow={{ base: "1", md: "auto" }}
          gridColumn={{ base: "2", md: "auto" }}
          justifySelf={{ base: "end", md: "auto" }}
          display={{ base: "none", md: "block" }}
        >
          <StatusBadge status={inv.status} />
        </Box>
        <Box display={{ base: "none", md: "block" }} color="brand.500">
          <ChevronRightIcon boxSize={4} />
        </Box>
        <Flex display={{ base: "flex", md: "none" }} justify="flex-end" gridColumn="2" gridRow="3">
          <StatusBadge status={inv.status} />
        </Flex>
      </Grid>
    </Box>
  );
};

export default InvoiceCard;
