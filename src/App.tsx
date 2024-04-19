import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import MainPage from "./components/mainPage/mainPage";
import Home from "./components/homePage/home";
import { FoodContextProvider } from "./components/store/FoodContext";
import Footer from "./components/footer/footer";
import CartContextProvider from "./components/store/CartContext";
import { UserProgressProvider } from "./components/store/UserProgressContext";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import PastOrders from "./components/pastOrders/PastOrders";

const App: React.FC = () => {
  return (
    <>
      <UserProgressProvider>
        <CartContextProvider>
          <FoodContextProvider>
            <Navbar />
            <Cart />
            <Checkout/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mainpage" element={<MainPage />} />
              <Route path="/orders" element={<PastOrders />} />
            </Routes>
          </FoodContextProvider>
        </CartContextProvider>
      </UserProgressProvider>
    </>
  );
};

export default App;
