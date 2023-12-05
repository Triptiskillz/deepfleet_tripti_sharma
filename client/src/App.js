import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import SummaryWidget from "./components/Admin/showSales/SummaryWidget";
import SalesForDay from "./components/Admin/showSales/SalesForDay";
import Category from "./components/Admin/category/Category";
import Product from "./components/Admin/product/Product";
import Landing from "./components/user/Landing";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/report" element={<SummaryWidget />} />
        <Route path="/todaysalesreport" element={<SalesForDay />} />
        <Route path="/category" element={<Category />} />
        <Route path="/product" element={<Product />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
