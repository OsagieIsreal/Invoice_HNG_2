import { create } from "zustand";
import type { Invoice } from "@/types/invoice";

const STORAGE_KEY = "invoice-app:invoices";

const seed: Invoice[] = [
  {
    id: "RT3080",
    createdAt: "2021-08-18",
    paymentDue: "2021-08-19",
    paymentTerms: 0,
    description: "Re-branding",
    status: "paid",
    clientName: "Jensen Huang",
    clientEmail: "jensenh@mail.com",
    senderAddress: {
      street: "19 Union Terrace",
      city: "London",
      postCode: "E1 3EZ",
      country: "United Kingdom",
    },
    clientAddress: {
      street: "106 Kendell Street",
      city: "Sharrington",
      postCode: "NR24 5WQ",
      country: "United Kingdom",
    },
    items: [
      { id: "1", name: "Brand Guidelines", quantity: 1, price: 1800.9, total: 1800.9 },
    ],
    total: 1800.9,
  },
  {
    id: "XM9141",
    createdAt: "2021-08-21",
    paymentDue: "2021-09-20",
    paymentTerms: 30,
    description: "Graphic Design",
    status: "pending",
    clientName: "Alex Grim",
    clientEmail: "alexgrim@mail.com",
    senderAddress: {
      street: "19 Union Terrace",
      city: "London",
      postCode: "E1 3EZ",
      country: "United Kingdom",
    },
    clientAddress: {
      street: "84 Church Way",
      city: "Bradford",
      postCode: "BD1 9PB",
      country: "United Kingdom",
    },
    items: [
      { id: "1", name: "Banner Design", quantity: 1, price: 156.0, total: 156.0 },
      { id: "2", name: "Email Design", quantity: 2, price: 200.0, total: 400.0 },
    ],
    total: 556.0,
  },
  {
    id: "RG0314",
    createdAt: "2021-09-24",
    paymentDue: "2021-10-01",
    paymentTerms: 30,
    description: "Website Redesign",
    status: "draft",
    clientName: "John Morrison",
    clientEmail: "jm@myco.com",
    senderAddress: {
      street: "19 Union Terrace",
      city: "London",
      postCode: "E1 3EZ",
      country: "United Kingdom",
    },
    clientAddress: {
      street: "79 Dover Road",
      city: "Westhall",
      postCode: "IP19 3PF",
      country: "United Kingdom",
    },
    items: [
      { id: "1", name: "Website Redesign", quantity: 1, price: 14002.33, total: 14002.33 },
    ],
    total: 14002.33,
  },
];

const load = (): Invoice[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed;
    const parsed = JSON.parse(raw) as Invoice[];
    return Array.isArray(parsed) ? parsed : seed;
  } catch {
    return seed;
  }
};

const persist = (list: Invoice[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
};

interface InvoiceState {
  invoices: Invoice[];
  addInvoice: (inv: Invoice) => void;
  updateInvoice: (id: string, inv: Invoice) => void;
  deleteInvoice: (id: string) => void;
  markAsPaid: (id: string) => void;
  loadFromLocalStorage: () => void;
  persistToLocalStorage: () => void;
  getById: (id: string) => Invoice | undefined;
}

export const useInvoiceStore = create<InvoiceState>((set, get) => ({
  invoices: load(),
  addInvoice: (inv) =>
    set((s) => {
      const next = [inv, ...s.invoices];
      persist(next);
      return { invoices: next };
    }),
  updateInvoice: (id, inv) =>
    set((s) => {
      const next = s.invoices.map((x) => (x.id === id ? inv : x));
      persist(next);
      return { invoices: next };
    }),
  deleteInvoice: (id) =>
    set((s) => {
      const next = s.invoices.filter((x) => x.id !== id);
      persist(next);
      return { invoices: next };
    }),
  markAsPaid: (id) =>
    set((s) => {
      const next = s.invoices.map((x) =>
        x.id === id && x.status === "pending" ? { ...x, status: "paid" as const } : x
      );
      persist(next);
      return { invoices: next };
    }),
  loadFromLocalStorage: () => set({ invoices: load() }),
  persistToLocalStorage: () => persist(get().invoices),
  getById: (id) => get().invoices.find((x) => x.id === id),
}));
