import type { Invoice } from "@/types/invoice";
import type { InvoiceFormValues as FormVals } from "@/schemas/invoiceSchema";

// 6-char id like "RT3080"
export const generateInvoiceId = (): string => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const l = () => letters[Math.floor(Math.random() * letters.length)];
  const n = () => Math.floor(Math.random() * 10).toString();
  return `${l()}${l()}${n()}${n()}${n()}${n()}`;
};

export const formatCurrency = (n: number): string =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(n);

export const formatDate = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const addDays = (iso: string, days: number): string => {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

export const computeItemTotal = (qty: number, price: number) =>
  Math.round(qty * price * 100) / 100;

export const computeInvoiceTotal = (
  items: { quantity: number; price: number }[]
) =>
  Math.round(
    items.reduce((s, i) => s + (i.quantity || 0) * (i.price || 0), 0) * 100
  ) / 100;

export const buildInvoiceFromForm = (
  values: FormVals,
  status: Invoice["status"],
  existing?: Invoice
): Invoice => {
  const items = values.items.map((it) => ({
    ...it,
    total: computeItemTotal(it.quantity, it.price),
  }));
  return {
    id: existing?.id ?? generateInvoiceId(),
    createdAt: values.createdAt,
    paymentDue: addDays(values.createdAt, values.paymentTerms),
    paymentTerms: values.paymentTerms,
    description: values.description,
    status,
    clientName: values.clientName,
    clientEmail: values.clientEmail,
    senderAddress: values.senderAddress,
    clientAddress: values.clientAddress,
    items,
    total: computeInvoiceTotal(items),
  };
};

export const emptyFormValues = (): FormVals => ({
  senderAddress: { street: "", city: "", postCode: "", country: "" },
  clientName: "",
  clientEmail: "",
  clientAddress: { street: "", city: "", postCode: "", country: "" },
  createdAt: new Date().toISOString().slice(0, 10),
  paymentTerms: 30,
  description: "",
  items: [],
});

export const invoiceToFormValues = (inv: Invoice): FormVals => ({
  senderAddress: inv.senderAddress,
  clientName: inv.clientName,
  clientEmail: inv.clientEmail,
  clientAddress: inv.clientAddress,
  createdAt: inv.createdAt.slice(0, 10),
  paymentTerms: inv.paymentTerms,
  description: inv.description,
  items: inv.items.map((i) => ({ ...i })),
});

export type { InvoiceFormValues } from "@/schemas/invoiceSchema";
