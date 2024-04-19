import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate da react-router-dom
import { CartContext } from "./store/CartContext";

const Paypal = () => {
  const paypal = useRef();
  const cartCtx = useContext(CartContext);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [errorOccurred, setErrorOccurred] = useState<string | null>(null);
  const navigate = useNavigate(); // Ottieni l'istanza di useNavigate

  const description = cartCtx.items.map((item) => item.name).join(", ");

  let totalPrice = cartCtx.items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      navigate("/"); // Reindirizza alla pagina principale dopo un certo periodo di tempo (ad esempio, 3 secondi)
    }, 3000);
  };

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: description,
                amount: {
                  currency_code: "EUR",
                  value: totalPrice.toFixed(2),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          try {
            const order = await actions.order.capture();
            console.log(order);
            handlePaymentSuccess();
          } catch (error) {
            setErrorOccurred(error.message);
          }
        },
        onError: (err) => {
          console.log(err);
          setErrorOccurred(err.message);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <>
      {paymentSuccess ? (
        <h3>Payment successful. You will be redirected to the main page shortly...</h3>
      ) : (
        <div ref={paypal}></div>
      )}
    </>
  );
};

export default Paypal;
