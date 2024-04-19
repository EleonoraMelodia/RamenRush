import React from "react";
import { currencyFormatter } from "../../util/priceFormatter";

const CartItems = ({
  name,
  quantity,
  price,
  handleDecrease,
  handleIncrease,
}) => {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={handleDecrease}> - </button>
        <span> {quantity} </span>
        <button onClick={handleIncrease}>+</button>
      </p>
    </li>
  );
};

export default CartItems;
