import React, { useContext, useState, FormEvent } from "react";
import Modal from "../../UI/Modal";
import Input from "../../UI/Input";
import UserProgressContext from "../store/UserProgressContext";
import Button from "../../UI/Button";
import { CartContext } from "../store/CartContext";
import useHttp from "../../customHooks/useHttp";
import Error from "../../UI/Error";
import errorImg from "../../assets/orderDropped.png";
import Paypal from "../Paypal";
import { currencyFormatter } from "../../util/priceFormatter";

interface FormDataEntry {
  [key: string]: string | number;
}

const configRequestObj = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const Checkout = () => {
  const [payment, setPayment] = useState<boolean>(false);

  const { data, error, isLoading, sendRequest } = useHttp(
    "http://localhost:3000/ords",
    configRequestObj
  );

  const progressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);

  const totalPrice = cartCtx.items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  const handleCheckoutClosing = () => {
    progressCtx.closeCheckout();
    cartCtx.clearCart();
  };

  const handleOnCloseModal = () => {
    progressCtx.closeCheckout();
  };

  const handleOrderSubmit = (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);

    type FormDataEntry = [string, string];

    const customerData: Record<string, string> = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [
        key,
        String(value),
      ]) as FormDataEntry[]
    );

    const orderData = {
      order: {
        items: cartCtx.items,
        customer: customerData,
      },
    };

    sendRequest(JSON.stringify(orderData));
    setPayment(true);
  };

  return (
    <>
      {payment ? (
        <Modal open={progressCtx.progress === "checkout"}>
          <Paypal />
          <Button onClick={handleCheckoutClosing}>Close</Button>
        </Modal>
      ) : (
        <>
          {error ? (
            <Error
              img={errorImg}
              title="Sorry, order not sent"
              message={error}
            />
          ) : (
            <Modal
              open={progressCtx.progress === "checkout" && !error}
              onClose={handleOnCloseModal}
            >
              <form onSubmit={handleOrderSubmit}>
                <h2>Checkout</h2>
                <p>Total amount: {currencyFormatter.format(totalPrice)}</p>

                <Input id="name" label="Name" type="text" />
                <Input id="email" label="Email" type="email" />
                <Input id="street" label="Street" type="text" />
                <div className="control-row">
                  <Input id="city" label="City" type="text" />
                  <Input id="postal-code" label="Postal Code" type="text" />
                </div>

                <p className="modal-actions">
                  {isLoading ? (
                    <span>Wait for the order...</span>
                  ) : (
                    <>
                      <Button onClick={handleCheckoutClosing}>Close</Button>
                      <Button type="submit">Pay</Button>
                    </>
                  )}
                </p>
              </form>
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default Checkout;
