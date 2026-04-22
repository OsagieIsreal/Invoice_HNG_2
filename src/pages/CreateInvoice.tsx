// Standalone create page (also reachable via "/new"). Uses the drawer form.
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import { useInvoiceStore } from "@/store/useInvoiceStore";
import { buildInvoiceFromForm, emptyFormValues } from "@/utils";
import Home from "./Home";

const CreateInvoice = () => {
  const navigate = useNavigate();
  const addInvoice = useInvoiceStore((s) => s.addInvoice);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  const close = () => {
    onClose();
    navigate("/");
  };

  return (
    <>
      <Home />
      <InvoiceForm
        isOpen={isOpen}
        onClose={close}
        title="New Invoice"
        mode="create"
        initialValues={emptyFormValues()}
        onSaveDraft={(v) => {
          addInvoice(buildInvoiceFromForm(v, "draft"));
          close();
        }}
        onSubmitInvoice={(v) => {
          addInvoice(buildInvoiceFromForm(v, "pending"));
          close();
        }}
      />
    </>
  );
};

export default CreateInvoice;
