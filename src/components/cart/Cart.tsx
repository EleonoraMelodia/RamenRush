import React, { useContext } from "react";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../../util/priceFormatter";
import Modal from "../../UI/Modal";
import UserProgressContext from "../store/UserProgressContext";
import Button from "../../UI/Button";
import CartItems from "./CartItems";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(UserProgressContext);

  const totalPrice = cartCtx.items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  const handleClosingCart = () => {
    progressCtx.hideCart();
  };
  const handleOpenCheckout = () => {
    progressCtx.openCheckout();
    console.log("open checkout");
  };

  return (
    <Modal
      className="cart"
      onClose={progressCtx.progress === ""}
      open={progressCtx.progress === "cart"}
    >
      <h1>Your Ramen cart</h1>
      <ul>
        {cartCtx.items.map((item) => {
          return (
            <CartItems
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              key={item.id}
              handleDecrease={() => cartCtx.removeItem(item.id)}
              handleIncrease={() => cartCtx.addItem(item)}
            />
          );
        })}
      </ul>
      <h3> Total price: {currencyFormatter.format(totalPrice)} </h3>
      <p className="modal-actions">
        <Button onClick={handleClosingCart}>Close</Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleOpenCheckout}> Checkout </Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
