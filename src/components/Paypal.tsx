import React, { useContext, useEffect, useRef, useState } from "react";

import Error from "../UI/Error"
import errorImg from "../assets/error.png"

import { useNavigate } from "react-router-dom"; // Importa useNavigate da react-router-dom
import { CartContext } from "./store/CartContext";
import useHttp from "../customHooks/useHttp";

interface FormDataEntry {
  [key: string]: string | number;
}

const configRequestObj = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const Paypal = () => {
  const paypal = useRef<HTMLDivElement>(null); // Aggiungi il tipo per il ref
  const cartCtx = useContext(CartContext);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [errorOccurred, setErrorOccurred] = useState<string | null>(null);
  const navigate = useNavigate(); // Ottieni l'istanza di useNavigate

  const { data, error, isLoading, sendRequest } = useHttp(
    "http://localhost:3000/orders",
    configRequestObj
  );

  const description = cartCtx.items.map((item) => item.name).join(", ");

  let totalPrice = cartCtx.items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  const handlePaymentSuccess = async () => { // Aggiungi async
    try {
      setPaymentSuccess(true);
      await sendRequest(JSON.stringify({ // Invia la richiesta dopo che il pagamento ha successo
        order: {
          items: cartCtx.items,
          customer: {}, // Puoi aggiungere qui i dati del cliente se necessario
        },
      }));
      setTimeout(() => {
        navigate("/"); // Reindirizza alla pagina principale dopo un certo periodo di tempo (ad esempio, 3 secondi)
      }, 3000);
    } catch (error) {
      setErrorOccurred(error.message);
    }
  };

  useEffect(() => {
    if (!paypal.current) return; // Aggiungi controllo di nullità

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
  }, [cartCtx.items]); // Aggiungi cartCtx.items come dipendenza dell'effetto useEffect

  return (
    <>
      {error ? (
        <Error
          img={errorImg}
          title="Sorry, order not sent"
          message={error} 
        />
      ) : <> </>}

      {paymentSuccess ? (
        <h3>
          Payment successful. You will be redirected to the main page shortly...
        </h3>
      ) : (
        <div ref={paypal}></div>
      )}
    </>
  );
};

export default Paypal;
