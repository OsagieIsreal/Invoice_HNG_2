import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  Select,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { DeleteIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { Formik, FieldArray, getIn, type FormikProps } from "formik";
import { toFormikValidate } from "@/utils/zodFormik";
import {
  invoiceSchema,
  PAYMENT_TERMS_OPTIONS,
  type InvoiceFormValues,
} from "@/schemas/invoiceSchema";
import { computeItemTotal, formatCurrency } from "@/utils";
import { useEffect, useRef } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialValues: InvoiceFormValues;
  title: React.ReactNode;
  mode: "create" | "edit";
  onSaveDraft?: (values: InvoiceFormValues) => void;
  onSubmitInvoice: (values: InvoiceFormValues) => void;
}

const labelStyle = (colorMode: "light" | "dark") => ({
  fontSize: "xs",
  fontWeight: 500,
  color: colorMode === "dark" ? "#DFE3FA" : "#7E88C3",
  mb: 1.5,
});

const inputProps = (colorMode: "light" | "dark") => ({
  bg: colorMode === "dark" ? "#1E2139" : "white",
  color: colorMode === "dark" ? "white" : "#0C0E16",
  borderColor: colorMode === "dark" ? "#252945" : "#DFE3FA",
  borderRadius: "4px",
  h: "48px",
  fontWeight: 700,
  _hover: { borderColor: "brand.500" },
  _focus: { borderColor: "brand.500", boxShadow: "none" },
});

const InvoiceForm = ({
  isOpen,
  onClose,
  initialValues,
  title,
  mode,
  onSaveDraft,
  onSubmitInvoice,
}: Props) => {
  const { colorMode } = useColorMode();
  const formRef = useRef<FormikProps<InvoiceFormValues> | null>(null);

  // Reset form values whenever a new edit target opens
  useEffect(() => {
    if (isOpen) formRef.current?.resetForm({ values: initialValues });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialValues.clientEmail]);

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      size={{ base: "full", md: "md", lg: "lg" } as never}
      autoFocus={false}
    >
      <DrawerOverlay />
      <DrawerContent
        bg={colorMode === "dark" ? "#141625" : "white"}
        ml={{ lg: "103px" }}
        borderRightRadius={{ md: "20px" }}
        maxW={{ base: "100%", md: "616px", lg: "719px" }}
      >
        <DrawerBody px={{ base: 6, md: 14 }} py={{ base: 8, md: 14 }}>
          <Flex
            display={{ base: "flex", md: "none" }}
            align="center"
            gap={6}
            mb={6}
            as="button"
            onClick={onClose}
            cursor="pointer"
          >
            <ArrowBackIcon color="brand.500" />
            <Text fontWeight={700}>Go back</Text>
          </Flex>
          <Heading as="h2" size="lg" mb={6}>
            {title}
          </Heading>

          <Formik<InvoiceFormValues>
            innerRef={formRef}
            initialValues={initialValues}
            validate={toFormikValidate(invoiceSchema)}
            onSubmit={() => { /* handled via custom buttons */ }}
            enableReinitialize
          >
            {(formik) => {
              const { values, errors, touched, handleChange, handleBlur, setFieldValue, validateForm, setTouched } = formik;
              const itemsError = typeof errors.items === "string" ? errors.items : undefined;
              const hasNoItems = !values.items.length;

              const submit = async () => {
                const errs = await validateForm();
                if (Object.keys(errs).length === 0) {
                  onSubmitInvoice(values);
                } else {
                  // mark all fields touched so errors show
                  const flatten = (obj: unknown, base = ""): Record<string, boolean> => {
                    const out: Record<string, boolean> = {};
                    if (obj && typeof obj === "object") {
                      for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
                        const path = base ? `${base}.${k}` : k;
                        if (v && typeof v === "object" && !Array.isArray(v)) Object.assign(out, flatten(v, path));
                        else out[path] = true;
                      }
                    }
                    return out;
                  };
                  setTouched(flatten(errs) as never, false);
                }
              };

              return (
                <Box>
                  {/* Bill From */}
                  <Text color="brand.500" fontWeight={700} fontSize="sm" mb={6}>
                    Bill From
                  </Text>
                  <Stack spacing={5}>
                    <FormField label="Street Address" name="senderAddress.street" formik={formik} />
                    <Grid templateColumns={{ base: "1fr 1fr", md: "1fr 1fr 1fr" }} gap={4}>
                      <FormField label="City" name="senderAddress.city" formik={formik} />
                      <FormField label="Post Code" name="senderAddress.postCode" formik={formik} />
                      <GridItem colSpan={{ base: 2, md: 1 }}>
                        <FormField label="Country" name="senderAddress.country" formik={formik} />
                      </GridItem>
                    </Grid>
                  </Stack>

                  {/* Bill To */}
                  <Text color="brand.500" fontWeight={700} fontSize="sm" mt={10} mb={6}>
                    Bill To
                  </Text>
                  <Stack spacing={5}>
                    <FormField label="Client's Name" name="clientName" formik={formik} />
                    <FormField label="Client's Email" name="clientEmail" formik={formik} placeholder="e.g. email@example.com" />
                    <FormField label="Street Address" name="clientAddress.street" formik={formik} />
                    <Grid templateColumns={{ base: "1fr 1fr", md: "1fr 1fr 1fr" }} gap={4}>
                      <FormField label="City" name="clientAddress.city" formik={formik} />
                      <FormField label="Post Code" name="clientAddress.postCode" formik={formik} />
                      <GridItem colSpan={{ base: 2, md: 1 }}>
                        <FormField label="Country" name="clientAddress.country" formik={formik} />
                      </GridItem>
                    </Grid>
                    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                      <FormField label="Invoice Date" name="createdAt" type="date" formik={formik} />
                      <PaymentTermsSelect label="Payment Terms" name="paymentTerms" formik={formik} />
                    </Grid>
                    <FormField label="Project Description" name="description" formik={formik} placeholder="e.g. Graphic Design Service" />
                  </Stack>

                  {/* Items */}
                  <Text color="#777F98" fontWeight={700} fontSize="lg" mt={12} mb={4}>
                    Item List
                  </Text>
                  <FieldArray name="items">
                    {({ push, remove }) => (
                      <Stack spacing={5}>
                        {values.items.map((item, idx) => {
                          const namePath = `items.${idx}.name`;
                          const qtyPath = `items.${idx}.quantity`;
                          const pricePath = `items.${idx}.price`;
                          const total = computeItemTotal(Number(item.quantity) || 0, Number(item.price) || 0);
                          return (
                            <Grid
                              key={item.id}
                              templateColumns={{
                                base: "1fr 1fr 1fr auto",
                                md: "4fr 1fr 1.5fr 1fr auto",
                              }}
                              templateAreas={{
                                base: `"name name name name" "qty price total del"`,
                                md: `"name qty price total del"`,
                              }}
                              gap={4}
                              alignItems="end"
                            >
                              <GridItem area="name">
                                <FormField label="Item Name" name={namePath} formik={formik} />
                              </GridItem>
                              <GridItem area="qty">
                                <FormField label="Qty." name={qtyPath} type="number" formik={formik} />
                              </GridItem>
                              <GridItem area="price">
                                <FormField label="Price" name={pricePath} type="number" formik={formik} />
                              </GridItem>
                              <GridItem area="total">
                                <Text {...labelStyle(colorMode)}>Total</Text>
                                <Text fontWeight={700} color="#888EB0" h="48px" display="flex" alignItems="center">
                                  {formatCurrency(total)}
                                </Text>
                              </GridItem>
                              <GridItem area="del" pb={3}>
                                <IconButton
                                  aria-label="Delete item"
                                  icon={<DeleteIcon />}
                                  variant="ghost"
                                  color="#888EB0"
                                  _hover={{ color: "danger.500", bg: "transparent" }}
                                  onClick={() => remove(idx)}
                                />
                              </GridItem>
                            </Grid>
                          );
                        })}
                        <Button
                          variant="secondary"
                          w="full"
                          onClick={() =>
                            push({
                              id: Math.random().toString(36).slice(2, 9),
                              name: "",
                              quantity: 1,
                              price: 0,
                              total: 0,
                            })
                          }
                        >
                          + Add New Item
                        </Button>
                        {hasNoItems && itemsError && (
                          <Text color="danger.500" fontSize="xs" fontWeight={600}>
                            {itemsError}
                          </Text>
                        )}
                      </Stack>
                    )}
                  </FieldArray>

                  {/* Footer */}
                  <Flex
                    mt={10}
                    pt={6}
                    justify={mode === "create" ? "space-between" : "flex-end"}
                    gap={2}
                    flexWrap="wrap"
                  >
                    {mode === "create" ? (
                      <>
                        <Button variant="secondary" onClick={onClose}>
                          Discard
                        </Button>
                        <Flex gap={2}>
                          <Button variant="dark" onClick={() => onSaveDraft?.(values)}>
                            Save as Draft
                          </Button>
                          <Button variant="primary" onClick={submit}>
                            Save &amp; Send
                          </Button>
                        </Flex>
                      </>
                    ) : (
                      <>
                        <Button variant="secondary" onClick={onClose}>
                          Cancel
                        </Button>
                        <Button variant="primary" onClick={submit}>
                          Save Changes
                        </Button>
                      </>
                    )}
                  </Flex>
                  {/* setFieldValue used implicitly to satisfy TS */}
                  <input type="hidden" value="" onChange={() => setFieldValue("items", values.items)} />
                  <input type="hidden" value="" onChange={() => { handleBlur({ target: { name: "" } } as never); handleChange({ target: { name: "" } } as never); }} />
                  <input type="hidden" value={JSON.stringify({ touched, errors })} readOnly />
                </Box>
              );
            }}
          </Formik>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>;
}

interface PaymentTermsSelectProps {
  label: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>;
}

const PaymentTermsSelect = ({ label, name, formik }: PaymentTermsSelectProps) => {
  const { colorMode } = useColorMode();
  const value = getIn(formik.values, name) ?? "";
  const error = getIn(formik.errors, name);
  const touched = getIn(formik.touched, name);
  const showError = Boolean(touched && error);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const numValue = Number(e.target.value);
    formik.setFieldValue(name, numValue);
  };

  return (
    <FormControl isInvalid={showError}>
      <Flex justify="space-between" align="baseline" mb={1.5}>
        <FormLabel m={0} {...labelStyle(colorMode)}>
          {label}
        </FormLabel>
        {showError && (
          <FormErrorMessage m={0} fontSize="xs" color="danger.500">
            {String(error)}
          </FormErrorMessage>
        )}
      </Flex>
      <Select
        id={name}
        name={name}
        value={value !== "" ? String(value) : ""}
        onChange={handleChange}
        onBlur={formik.handleBlur}
        {...inputProps(colorMode)}
        borderColor={showError ? "danger.500" : inputProps(colorMode).borderColor}
      >
        <option value="">Select payment terms</option>
        {PAYMENT_TERMS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

const FormField = ({ label, name, type = "text", placeholder, formik }: FieldProps) => {
  const { colorMode } = useColorMode();
  const value = getIn(formik.values, name) ?? "";
  const error = getIn(formik.errors, name);
  const touched = getIn(formik.touched, name);
  const showError = Boolean(touched && error);
  return (
    <FormControl isInvalid={showError}>
      <Flex justify="space-between" align="baseline" mb={1.5}>
        <FormLabel m={0} {...labelStyle(colorMode)}>
          {label}
        </FormLabel>
        {showError && (
          <FormErrorMessage m={0} fontSize="xs" color="danger.500">
            {String(error)}
          </FormErrorMessage>
        )}
      </Flex>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value as string}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        {...inputProps(colorMode)}
        borderColor={showError ? "danger.500" : inputProps(colorMode).borderColor}
      />
    </FormControl>
  );
};

export default InvoiceForm;
