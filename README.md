# Invoice_HNG2

A fully responsive Invoice Management Application built with React, allowing users to create, manage, and track invoices efficiently.

---
# 🚀 Live Demo

[My Live Demo Will Be here]

---

# 📦 GitHub Repository

[This is My repo link here]

---

# 📌 Overview

This project is a full-featured invoice management system inspired by real-world tools like QuickBooks and FreshBooks. It enables users to perform full CRUD operations, manage invoice statuses, and enjoy a seamless user experience across all devices.

---

# ✨ Features

## 📄 Invoice Management

* Create new invoices
* View all invoices
* View detailed invoice information
* Edit existing invoices
* Delete invoices with confirmation

# 🔄 Status Workflow

Each invoice has a status:

* **Draft** – Saved but not finalized
* **Pending** – Sent but not yet paid
* **Paid** – Completed

**Rules:**

* Draft → can be edited and updated
* Pending → can be marked as Paid
* Paid → cannot be modified

---

# ✅ Form Validation

* Required fields enforced
* Email format validation
* At least one invoice item required
* Quantity and price must be positive numbers
* Real-time error feedback

---

# 🔍 Filtering

* Filter invoices by:

  * All
  * Draft
  * Pending
  * Paid
* Instant UI updates
* Empty state handling

---

# 🌗 Theme Toggle

* Light and Dark mode support
* Persistent theme using LocalStorage
* Accessible color contrast

---

# 📱 Responsive Design

* Fully responsive across:

  * Mobile (320px+)
  * Tablet (768px+)
  * Desktop (1024px+)
* Optimized layouts for all screen sizes

---

# 🎯 User Experience

* Hover states for all interactive elements
* Smooth UI interactions
* Clean and modern interface based on Figma design

---

# ♿ Accessibility

* Semantic HTML structure
* Proper form labels
* Keyboard navigable components
* Accessible modal (focus trap, ESC to close)
* WCAG-compliant contrast

---

# 🛠️ Tech Stack

* **Frontend:** React (Vite + TypeScript)
* **UI Library:** Chakra UI
* **State Management:** Zustand
* **Form Handling:** Formik
* **Validation:** Zod
* **Routing:** React Router DOM
* **Persistence:** LocalStorage
* **Animation (optional):** Framer Motion

---

# 🧱 Project Structure

```
src/
 ├── components/
 │    ├── common/
 │    ├── invoice/
 │    ├── layout/
 │    ├── modals/
 │    ├── filters/
 │
 ├── pages/
 │    ├── Home.tsx
 │    ├── InvoiceDetail.tsx
 │    ├── EditInvoice.tsx
 │    ├── CreateInvoice.tsx
 │
 ├── store/
 │    ├── useInvoiceStore.ts
 │    ├── useThemeStore.ts
 │
 ├── schemas/
 │    ├── invoiceSchema.ts
 │
 ├── types/
 │    ├── invoice.ts
 │
 ├── utils/
 │
 ├── routes/
 │    ├── AppRouter.tsx
 │
 ├── App.tsx
 ├── main.tsx
```

---

# ⚙️ Installation & Setup

# 1. Clone the repository

```bash
git clone https://github.com/your-username/invoice-app.git
```

# 2. Navigate into the project

```bash
cd invoice-app
```

# 3. Install dependencies

```bash
npm install
```

# 4. Run development server

```bash
npm run dev
```

---
# 💾 Data Persistence

* Invoice data is stored in **LocalStorage**
* Automatically synced on:

  * Create
  * Update
  * Delete
* Data persists across page reloads

---

# 🧠 Architecture Decisions

# Zustand for State Management

* Lightweight and scalable
* Avoids prop drilling
* Centralized invoice logic

# Formik + Zod

* Formik handles form state
* Zod provides schema-based validation
* Clean and reusable validation logic

# LocalStorage Instead of Backend

* Simpler setup for this stage
* Faster development
* Suitable for small-scale applications

---

# ⚖️ Trade-offs

* LocalStorage is not suitable for large-scale or multi-user applications
* No authentication system implemented
* No backend means no real-time sync across devices

---

# 🚀 Future Improvements

* Add backend (Node.js / Express / Next.js API)
* User authentication (JWT / OAuth)
* Export invoices as PDF
* Email invoice feature
* Pagination for large datasets
* Unit and integration testing

---

# 📷 Design Reference

Figma Design:
https://www.figma.com/design/e3MtRefbZw41Ts897CQF4N/invoice-app?node-id=0-1&m=dev&t=pJoJoOU92dYwiC5p-1

---

# 🧪 Testing

* Manual testing performed across different screen sizes
* Form validation tested for edge cases
* Status transitions verified

---

# 📄 License

This project is for HNG Mentors, educational and assessment purposes.

---

# 🙌 Acknowledgements

* Figma design inspiration
* Frontend Mentor style challenges
* Open-source community tools
