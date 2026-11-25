
import { Route, Routes } from "react-router-dom";
import ProductQuery from "./pages/ProductQuery";
import PageDetails from "./pages/PageDetails";
import PageCategories from "./pages/PageCategories";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductQuery />} />
      <Route path="/products/:id" element={<PageDetails />} />
      <Route path="/categories" element={<PageCategories />} />
    </Routes>
  );
}
