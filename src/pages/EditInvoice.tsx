import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import InvoiceDetail from "./InvoiceDetail";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { buildInvoiceFromForm, invoiceToFormValues } from "@/utils";

const EditInvoice = () => {
  const { id = "" } = useParams();
  const inv = useInvoiceStore((s) => s.invoices.find((x) => x.id === id));
  const updateInvoice = useInvoiceStore((s) => s.updateInvoice);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (inv) onOpen();
  }, [inv, onOpen]);

  if (!inv) return <InvoiceDetail />;

  const close = () => {
    onClose();
    navigate(`/invoice/${inv.id}`);
  };

  return (
    <>
      <InvoiceDetail />
      <InvoiceForm
        isOpen={isOpen}
        onClose={close}
        title={<>Edit #{inv.id}</>}
        mode="edit"
        initialValues={invoiceToFormValues(inv)}
        onSubmitInvoice={(v) => {
          updateInvoice(
            inv.id,
            buildInvoiceFromForm(v, inv.status === "draft" ? "pending" : inv.status, inv)
          );
          close();
        }}
      />
    </>
  );
};

export default EditInvoice;
