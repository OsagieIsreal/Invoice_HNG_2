import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import Home from "@/pages/Home";
import InvoiceDetail from "@/pages/InvoiceDetail";
import EditInvoice from "@/pages/EditInvoice";
import CreateInvoice from "@/pages/CreateInvoice";
import NotFound from "@/pages/NotFound";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<CreateInvoice />} />
        <Route path="/invoice/:id" element={<InvoiceDetail />} />
        <Route path="/edit/:id" element={<EditInvoice />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
