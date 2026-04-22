import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import StatusBadge from "@/components/common/StatusBadge";
import DeleteModal from "@/components/modals/DeleteModal";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import { buildInvoiceFromForm, formatCurrency, formatDate, invoiceToFormValues } from "@/utils";
import type { InvoiceFormValues } from "@/schemas/invoiceSchema";

const InvoiceDetail = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const inv = useInvoiceStore((s) => s.invoices.find((x) => x.id === id));
  const markAsPaid = useInvoiceStore((s) => s.markAsPaid);
  const deleteInvoice = useInvoiceStore((s) => s.deleteInvoice);
  const updateInvoice = useInvoiceStore((s) => s.updateInvoice);
  const del = useDisclosure();
  const edit = useDisclosure();

  if (!inv) {
    return (
      <Box>
        <Text>Invoice not found.</Text>
        <Button as={RouterLink} to="/" mt={4} variant="primary">
          Go Home
        </Button>
      </Box>
    );
  }

  const cardBg = colorMode === "dark" ? "#1E2139" : "white";
  const itemsBg = colorMode === "dark" ? "#252945" : "#F9FAFE";
  const totalBg = colorMode === "dark" ? "#0C0E16" : "#373B53";

  const handleSaveEdit = (values: InvoiceFormValues) => {
    updateInvoice(inv.id, buildInvoiceFromForm(values, inv.status === "draft" ? "pending" : inv.status, inv));
    edit.onClose();
  };

  const handleDelete = () => {
    deleteInvoice(inv.id);
    del.onClose();
    navigate("/");
  };

  const ActionButtons = (
    <Flex gap={2} justify={{ base: "space-between", md: "flex-end" }} w="full">
      <Button variant="secondary" onClick={edit.onOpen}>
        Edit
      </Button>
      <Button variant="danger" onClick={del.onOpen}>
        Delete
      </Button>
      <Button
        variant="primary"
        onClick={() => markAsPaid(inv.id)}
        isDisabled={inv.status !== "pending"}
      >
        Mark as Paid
      </Button>
    </Flex>
  );

  return (
    <Box>
      <Flex
        as={RouterLink}
        to="/"
        align="center"
        gap={6}
        mb={8}
        fontWeight={700}
        cursor="pointer"
        _hover={{ color: "#7E88C3" }}
      >
        <ArrowBackIcon color="brand.500" />
        <Text>Go back</Text>
      </Flex>

      <Flex
        bg={cardBg}
        borderRadius="8px"
        p={{ base: 6, md: 8 }}
        align="center"
        justify="space-between"
        mb={4}
        gap={4}
        flexWrap="wrap"
      >
        <Flex
          align="center"
          gap={5}
          w={{ base: "full", md: "auto" }}
          justify={{ base: "space-between", md: "flex-start" }}
        >
          <Text color={colorMode === "dark" ? "#DFE3FA" : "#858BB2"} fontSize="sm" fontWeight={500}>
            Status
          </Text>
          <StatusBadge status={inv.status} />
        </Flex>
        <Box display={{ base: "none", md: "block" }}>{ActionButtons}</Box>
      </Flex>

      <Box bg={cardBg} borderRadius="8px" p={{ base: 6, md: 12 }} mb={{ base: 28, md: 0 }}>
        <Flex direction={{ base: "column", md: "row" }} justify="space-between" gap={8} mb={10}>
          <Box>
            <Text fontWeight={700} fontSize="md">
              <Text as="span" color="#7E88C3">#</Text>{inv.id}
            </Text>
            <Text color={colorMode === "dark" ? "#DFE3FA" : "#7E88C3"} fontSize="sm" mt={1}>
              {inv.description}
            </Text>
          </Box>
          <Stack spacing={0} fontSize="xs" color={colorMode === "dark" ? "#DFE3FA" : "#7E88C3"} textAlign={{ base: "left", md: "right" }}>
            <Text>{inv.senderAddress.street}</Text>
            <Text>{inv.senderAddress.city}</Text>
            <Text>{inv.senderAddress.postCode}</Text>
            <Text>{inv.senderAddress.country}</Text>
          </Stack>
        </Flex>

        <Grid templateColumns={{ base: "1fr 1fr", md: "1fr 1fr 1fr" }} gap={8} mb={{ base: 10, md: 12 }}>
          <Stack spacing={3}>
            <Text color={colorMode === "dark" ? "#DFE3FA" : "#7E88C3"} fontSize="xs">Invoice Date</Text>
            <Text fontWeight={700}>{formatDate(inv.createdAt)}</Text>
            <Box mt={6}>
              <Text color={colorMode === "dark" ? "#DFE3FA" : "#7E88C3"} fontSize="xs">Payment Due</Text>
              <Text fontWeight={700} mt={3}>{formatDate(inv.paymentDue)}</Text>
            </Box>
          </Stack>
          <Stack spacing={3}>
            <Text color={colorMode === "dark" ? "#DFE3FA" : "#7E88C3"} fontSize="xs">Bill To</Text>
            <Text fontWeight={700}>{inv.clientName}</Text>
            <Stack spacing={1} fontSize="xs" color={colorMode === "dark" ? "#DFE3FA" : "#7E88C3"}>
              <Text>{inv.clientAddress.street}</Text>
              <Text>{inv.clientAddress.city}</Text>
              <Text>{inv.clientAddress.postCode}</Text>
              <Text>{inv.clientAddress.country}</Text>
            </Stack>
          </Stack>
          <Stack spacing={3} gridColumn={{ base: "1 / -1", md: "auto" }}>
            <Text color={colorMode === "dark" ? "#DFE3FA" : "#7E88C3"} fontSize="xs">Sent to</Text>
            <Text fontWeight={700} wordBreak="break-all">{inv.clientEmail}</Text>
          </Stack>
        </Grid>

        <Box bg={itemsBg} borderTopRadius="8px" p={{ base: 6, md: 8 }}>
          {/* Desktop header */}
          <Grid
            display={{ base: "none", md: "grid" }}
            templateColumns="3fr 1fr 1.5fr 1fr"
            color={colorMode === "dark" ? "#DFE3FA" : "#7E88C3"}
            fontSize="xs"
            mb={6}
          >
            <Text>Item Name</Text>
            <Text textAlign="center">QTY.</Text>
            <Text textAlign="right">Price</Text>
            <Text textAlign="right">Total</Text>
          </Grid>
          <VStack spacing={6} align="stretch">
            {inv.items.map((it) => (
              <Box key={it.id}>
                {/* Desktop row */}
                <Grid display={{ base: "none", md: "grid" }} templateColumns="3fr 1fr 1.5fr 1fr" alignItems="center">
                  <Text fontWeight={700}>{it.name}</Text>
                  <Text textAlign="center" fontWeight={700} color={colorMode === "dark" ? "#DFE3FA" : "#7E88C3"}>
                    {it.quantity}
                  </Text>
                  <Text textAlign="right" fontWeight={700} color={colorMode === "dark" ? "#DFE3FA" : "#7E88C3"}>
                    {formatCurrency(it.price)}
                  </Text>
                  <Text textAlign="right" fontWeight={700}>{formatCurrency(it.total)}</Text>
                </Grid>
                {/* Mobile row */}
                <Flex display={{ base: "flex", md: "none" }} justify="space-between" align="center">
                  <Box>
                    <Text fontWeight={700}>{it.name}</Text>
                    <Text fontWeight={700} color={colorMode === "dark" ? "#888EB0" : "#7E88C3"} mt={1}>
                      {it.quantity} x {formatCurrency(it.price)}
                    </Text>
                  </Box>
                  <Text fontWeight={700}>{formatCurrency(it.total)}</Text>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Box>
        <Flex bg={totalBg} color="white" borderBottomRadius="8px" p={{ base: 6, md: 8 }} align="center" justify="space-between">
          <Text fontSize="xs">Amount Due</Text>
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight={700}>
            {formatCurrency(inv.total)}
          </Text>
        </Flex>
      </Box>

      {/* Mobile sticky action bar */}
      <Flex
        display={{ base: "flex", md: "none" }}
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        bg={cardBg}
        p={5}
        zIndex={5}
        boxShadow="0 -10px 20px rgba(0,0,0,0.1)"
      >
        {ActionButtons}
      </Flex>

      <DeleteModal
        isOpen={del.isOpen}
        onClose={del.onClose}
        onConfirm={handleDelete}
        invoiceId={inv.id}
      />
      <InvoiceForm
        isOpen={edit.isOpen}
        onClose={edit.onClose}
        title={
          <>
            Edit <Text as="span" color="#7E88C3">#</Text>
            {inv.id}
          </>
        }
        mode="edit"
        initialValues={invoiceToFormValues(inv)}
        onSubmitInvoice={handleSaveEdit}
      />
    </Box>
  );
};

export default InvoiceDetail;
