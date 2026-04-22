<<<<<<< HEAD
# Invoice_HNG2

A fully responsive Invoice Management Application built with React, allowing users to create, manage, and track invoices efficiently.

---
# 🚀 Live Demo

https://invoice-hng-2.vercel.app/

---

# 📦 GitHub Repository

https://github.com/OsagieIsreal/Invoice_HNG_2.git

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
=======
# Invoice_HNG_2
A modern, full-featured Invoice Management Application built with React, Vite, TypeScript, and Chakra UI.

## Features

✅ **CRUD Operations**
- Create, read, update, and delete invoices
- Form validation with Zod
- Error handling with clear feedback

✅ **Invoice Status Management**
- Draft → Pending → Paid workflow
- Status transitions with validation
- Visual status indicators

✅ **Filtering**
- Filter invoices by: All, Draft, Pending, Paid
- Real-time filtering
- Empty state messaging

✅ **Theme Support**
- Light/Dark mode toggle
- Theme persistence in LocalStorage
- Integrated with Chakra UI theming

✅ **Responsive Design**
- Mobile-first approach
- Support for 320px+ screens
- Responsive tables and layouts
- No horizontal scrolling

✅ **Accessibility**
- Semantic HTML structure
- ARIA labels
- Keyboard navigation support
- Focus trapping in modals
- ESC key to close modals

✅ **Data Persistence**
- LocalStorage integration
- Automatic saving of invoices
- Theme preference persistence

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Library**: Chakra UI
- **State Management**: Zustand
- **Form Handling**: Formik
- **Validation**: Zod
- **Routing**: React Router DOM
- **Animations**: Framer Motion (optional)

## Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   ├── invoice/          # Invoice-specific components
│   ├── layout/           # Layout wrapper and header
│   ├── modals/           # Modal components
│   └── filters/          # Filter components
├── pages/
│   ├── Home.tsx          # Invoice list page
│   ├── CreateInvoice.tsx # Create invoice page
│   ├── EditInvoice.tsx   # Edit invoice page
│   └── InvoiceDetail.tsx # Invoice detail view
├── store/
│   ├── useInvoiceStore.ts    # Invoice state management
│   └── useThemeStore.ts      # Theme state management
├── schemas/
│   └── invoiceSchema.ts      # Zod validation schemas
├── types/
│   └── invoice.ts            # TypeScript type definitions
├── utils/
│   └── helpers.ts            # Helper functions
├── routes/
│   └── AppRouter.tsx         # Route definitions
├── App.tsx                   # Main App component
└── main.tsx                  # Entry point
```

## Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Install peer dependencies if needed**
   ```bash
   npm install zod-formik-adapter
   ```

## Getting Started

### Development Server

Start the development server:
>>>>>>> ff99cb2d691490f91f3f59bd8732c26382cafa2f

```bash
npm run dev
```

<<<<<<< HEAD
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
=======
The application will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This will create an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Usage

### Creating an Invoice

1. Click the "New Invoice" button on the home page
2. Fill in the client information
3. Add invoice items with quantities and prices
4. Optionally add notes
5. Click "Create Invoice"

### Editing an Invoice

1. From the invoice list, click "Edit" on any invoice
2. Modify the invoice details
3. Click "Update Invoice"

### Managing Invoice Status

- **Draft → Pending**: Click "Mark as Pending" button on detail view
- **Pending → Paid**: Click "Mark as Paid" button on detail view
- **Paid**: Status cannot be changed back

### Filtering Invoices

Use the filter buttons at the top of the invoice list to view:
- All invoices
- Draft invoices only
- Pending invoices only
- Paid invoices only

### Theme Toggle

Click the sun/moon icon in the header to switch between light and dark mode. Your preference is automatically saved.

## Form Validation

The application validates:
- ✓ Client name (required)
- ✓ Email (valid email format)
- ✓ At least one invoice item (required)
- ✓ Quantity (must be positive)
- ✓ Price (must be positive)
- ✓ Dates (required)

Validation errors are displayed inline with clear messages.

## Data Persistence

All invoices and preferences are automatically saved to your browser's LocalStorage. Data persists between sessions.

### LocalStorage Keys
- `invoices`: Array of invoice objects
- `theme`: Current theme preference ('light' or 'dark')

## State Management with Zustand

### Invoice Store (`useInvoiceStore`)

```typescript
const store = useInvoiceStore();

// Methods
store.addInvoice(payload)           // Create new invoice
store.updateInvoice(id, payload)    // Update invoice
store.deleteInvoice(id)             // Delete invoice
store.getInvoiceById(id)            // Get single invoice
store.markAsPaid(id)                // Mark as paid
store.markAsPending(id)             // Mark as pending
store.loadFromLocalStorage()        // Load from storage
store.persistToLocalStorage()       // Save to storage
```

### Theme Store (`useThemeStore`)

```typescript
const store = useThemeStore();

// Methods
store.toggleTheme()                 // Toggle light/dark mode
store.loadFromLocalStorage()        // Load theme preference
store.persistToLocalStorage()       // Save theme preference
```

## Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

All components use Chakra UI's responsive props for proper scaling.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- PDF invoice export
- Email invoice functionality
- Invoice templates
- Payment tracking
- Multi-currency support
- Recurring invoices
- Client management
- Tax calculations
- Analytics dashboard

## Troubleshooting

### Dependencies Not Installing

If you encounter issues installing dependencies:

```bash
npm cache clean --force
npm install
```

### LocalStorage Issues

To clear all stored data:

```javascript
localStorage.removeItem('invoices');
localStorage.removeItem('theme');
```

### Port Already in Use

If port 5173 is already in use, Vite will automatically use the next available port.

## Performance

The application uses:
- Zustand for efficient state updates (only re-renders affected components)
- Code splitting via Vite
- Lazy loading of routes
- Optimized re-renders with React hooks
- CSS-in-JS with Chakra UI for minimal bundle size

## Accessibility Features

- ✓ Semantic HTML elements
- ✓ ARIA labels on all form inputs
- ✓ Proper heading hierarchy
- ✓ Keyboard navigation support
- ✓ Focus indicators
- ✓ Modal focus trap
- ✓ ESC key closes modals
- ✓ Color contrast compliance
- ✓ Screen reader friendly

## License

MIT

## Support

For issues or questions, please refer to the component documentation in each file.

---

Built with ❤️ using React, Vite, and Chakra UI
>>>>>>> ff99cb2d691490f91f3f59bd8732c26382cafa2f
