import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Home from "./routes";
import Login from "./routes/login";
import ProductsPage from "./routes/products";
import Register from "./routes/register";
import ProfilePage from "./routes/profile";

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to={"/app/products"} replace />} />
      <Route path="/app" element={<Home />}>
        <Route path="products" element={<ProductsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
