import React, { useContext } from "react";
import classes from "./FoodCard.module.css";
import { currencyFormatter } from "../../util/priceFormatter";
import Button from "../../UI/Button";
import { CartContext } from "../store/CartContext";
import AnimationElement from "../animationElement/AnimationElement";

import redCloudDx from "../../assets/cloudx.png";

type Food = {
  name: string;
  image: string;
  price: number;
  description: string;
  type: string;
};

const FoodCard: React.FC<{ food: Food }> = ({ food }) => {
  const cartCtx = useContext(CartContext);

  const handleAddToCart = () => {
    cartCtx.addItem(food);
  };



  return (
    <div className={classes.mainContainer}>
      <span className={classes.animation}>
        <AnimationElement link={redCloudDx} name="red cloud" />
      </span>

      <div className={classes.container}>
        <img src={food.image} alt="food" />
        <div>
          <span>
            <h2>{food.name}</h2>
            <h3>{food.description}</h3>
            <h4>{currencyFormatter.format(food.price)} euro </h4>
            <Button onClick={handleAddToCart}>Add to the cart</Button>
          </span>
        </div>
      </div>
      <span className={classes.animationSx}>
        <AnimationElement link={redCloudDx} name="red cloud" />
      </span>
    </div>
  );
};

export default FoodCard;
