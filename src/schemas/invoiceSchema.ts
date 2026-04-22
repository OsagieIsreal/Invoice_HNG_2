import { z } from "zod";

const addressSchema = z.object({
  street: z.string().trim().min(1, "can't be empty").max(120),
  city: z.string().trim().min(1, "can't be empty").max(60),
  postCode: z.string().trim().min(1, "can't be empty").max(20),
  country: z.string().trim().min(1, "can't be empty").max(60),
});

export const invoiceItemSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1, "can't be empty").max(80),
  quantity: z.coerce.number().positive("must be > 0"),
  price: z.coerce.number().nonnegative("must be \u2265 0"),
  total: z.number(),
});

export const PAYMENT_TERMS_OPTIONS = [
  { label: "Due on Receipt", value: 0 },
  { label: "Net 30 Days", value: 30 },
  { label: "Net 60 Days", value: 60 },
  { label: "Net 90 Days", value: 90 },
] as const;

const ALLOWED_PAYMENT_TERMS = [0, 30, 60, 90];

export const invoiceSchema = z.object({
  senderAddress: addressSchema,
  clientName: z.string().trim().min(1, "can't be empty").max(80),
  clientEmail: z.string().trim().email("invalid email").max(120),
  clientAddress: addressSchema,
  createdAt: z.string().min(1, "can't be empty"),
  paymentTerms: z.coerce.number().refine((val) => ALLOWED_PAYMENT_TERMS.includes(val), {
    message: "Invalid payment terms",
  }),
  description: z.string().trim().min(1, "can't be empty").max(200),
  items: z.array(invoiceItemSchema).min(1, "- An item must be added"),
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;
