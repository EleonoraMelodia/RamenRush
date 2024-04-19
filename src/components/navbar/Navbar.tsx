// Navbar.tsx
import React, { useContext, useState } from "react";
import classes from "./Navbar.module.css";
import logo from "../../assets/logo.png";
import { useFoodContext } from "../store/FoodContext";
import { CiShoppingCart } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

import { CartContext } from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";


import bao from "../../assets/bao.png";
import ramen from "../../assets/ramen.png";
import drinks from "../../assets/drinks.png";
import mochi from "../../assets/mochi.png";

const Navbar: React.FC = () => {
  const { foodChoice, setFoodChoice } = useFoodContext();
  const [modal, setModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(" ");

  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(UserProgressContext);
  const navigate = useNavigate();

  const handleShowCart = () => {
    progressCtx.openCart();
  };

  const totalItemsInCart = cartCtx.items.reduce((totalItems, item) => {
    return (totalItems += item.quantity);
  }, 0);


  const handleFoodModal = () => {
    setModal(true);
  };

  const handleFoodSelection = (selectedValue: string) => {
    setSelectedFood(selectedValue);
    setFoodChoice(selectedValue);
    navigate("/mainpage");
    setModal(false);
  };

  return (
    <nav className={classes.container}>
      <ul>
        <li>
          <Link to="">
            <div>
                <img src={logo} alt="logo" />
            </div>
          
          </Link>
        </li>
        <Link to="orders">
       Your orders
        </Link>
        <li>
          <button className={classes.foodButton} onClick={handleFoodModal}>
            Food
          </button>
          <dialog open={modal} onClose={() => setModal(false)}>
            <button
              className={classes.closeModal}
              onClick={() => setModal(false)}
            >
              X
            </button>
            <div className={classes.foodModal}>
              <button onClick={() => handleFoodSelection("ramen")}>
                <img src={ramen} alt="ramen" />
              </button>
              <button onClick={() => handleFoodSelection("bao")}>
                <img src={bao} alt="bao" />
              </button>
              <button onClick={() => handleFoodSelection("mochi")}>
                <img src={mochi} alt="mochi" />
              </button>
              <button onClick={() => handleFoodSelection("drinks")}>
                <img src={drinks} alt="drinks" />
              </button>
            </div>
          </dialog>
        </li>
        <li className={classes.cart}>
          <button onClick={handleShowCart} className={classes.buttonIcon}>
            <CiShoppingCart
              style={{
                width: "40px",
                height: "50px",
                color: "white",
                fontWeight: "bolder",
              }}
            />
            ({totalItemsInCart})
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
