import React from "react";
import useHttp from "../../customHooks/useHttp";
import styles from "./PastOrders.module.css";
import { currencyFormatter } from "../../util/priceFormatter";
import { Link, useNavigate } from "react-router-dom"

const mainConfiguration = {};

const PastOrders = () => {
  const { error, isLoading, data: fetchedData } = useHttp(
    "http://localhost:3000/orders",
    mainConfiguration
  );

  console.log(fetchedData);

  return (
    <div className={styles.container}>
      {fetchedData && fetchedData.lenght > 0 ? (
        fetchedData.map((order) => (
          <li key={order.id}>
            <div>Id Client: {order.customer.id}</div>
            <div>Order: {order.items[0].name}</div>
            <div>Price: {currencyFormatter.format(order.items[0].price) }</div>
          </li>
        ))
      ) : (
        <span> No orders yet </span>
      )}
    </div>
  );
};

export default PastOrders;
