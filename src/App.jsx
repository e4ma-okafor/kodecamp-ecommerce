import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/products/:id" element={<SingleProduct />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;