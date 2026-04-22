import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorMode,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useMemo, useState } from "react";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import StatusFilter, { type FilterValue } from "@/components/filters/StatusFilter";
import InvoiceCard from "@/components/invoice/InvoiceCard";
import EmptyState from "@/components/common/EmptyState";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import { buildInvoiceFromForm, emptyFormValues } from "@/utils";
import type { InvoiceFormValues } from "@/schemas/invoiceSchema";

const Home = () => {
  const invoices = useInvoiceStore((s) => s.invoices);
  const addInvoice = useInvoiceStore((s) => s.addInvoice);
  const { colorMode } = useColorMode();
  const [filters, setFilters] = useState<FilterValue[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const filtered = useMemo(() => {
    if (filters.length === 0) return invoices;
    return invoices.filter((i) => filters.includes(i.status as FilterValue));
  }, [invoices, filters]);

  const handleSaveDraft = (values: InvoiceFormValues) => {
    addInvoice(buildInvoiceFromForm(values, "draft"));
    onClose();
  };
  const handleSaveSend = (values: InvoiceFormValues) => {
    addInvoice(buildInvoiceFromForm(values, "pending"));
    onClose();
  };

  return (
    <Box>
      <Flex align="center" justify="space-between" mb={{ base: 8, md: 14 }} gap={4}>
        <Box>
          <Heading as="h1" size={{ base: "lg", md: "xl" } as never} letterSpacing="-1px">
            Invoices
          </Heading>
          <Text color={colorMode === "dark" ? "#DFE3FA" : "#888EB0"} fontSize="sm" mt={1}>
            {invoices.length === 0
              ? "No invoices"
              : `There are ${filtered.length} total invoices`}
          </Text>
        </Box>
        <Flex align="center" gap={{ base: 4, md: 10 }}>
          <StatusFilter value={filters} onChange={setFilters} />
          <Button
            variant="primary"
            leftIcon={
              <Flex
                align="center"
                justify="center"
                bg="white"
                color="brand.500"
                borderRadius="full"
                w="32px"
                h="32px"
              >
                <AddIcon boxSize={3} />
              </Flex>
            }
            pl={2}
            pr={{ base: 4, md: 6 }}
            h="48px"
            onClick={onOpen}
          >
            New <Box as="span" display={{ base: "none", md: "inline" }}>&nbsp;Invoice</Box>
          </Button>
        </Flex>
      </Flex>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <VStack spacing={4} align="stretch">
          {filtered.map((inv) => (
            <InvoiceCard key={inv.id} inv={inv} />
          ))}
        </VStack>
      )}

      <InvoiceForm
        isOpen={isOpen}
        onClose={onClose}
        title="New Invoice"
        mode="create"
        initialValues={emptyFormValues()}
        onSaveDraft={handleSaveDraft}
        onSubmitInvoice={handleSaveSend}
      />
    </Box>
  );
};

export default Home;
