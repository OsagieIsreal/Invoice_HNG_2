export type InvoiceStatus = "draft" | "pending" | "paid";

export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface Invoice {
  id: string;
  createdAt: string; // ISO date
  paymentDue: string; // ISO date
  paymentTerms: number; // days
  description: string;
  status: InvoiceStatus;
  clientName: string;
  clientEmail: string;
  senderAddress: Address;
  clientAddress: Address;
  items: InvoiceItem[];
  total: number;
}
