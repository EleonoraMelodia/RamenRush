import React, { useEffect, useState } from "react";
import FoodCard from "../foodCard/FoodCard";
import { useFoodContext } from "../store/FoodContext";
import classes from "./MainPage.module.css";
import useHttp from "../../customHooks/useHttp";
import Error from "../../UI/Error";
import errorImg from "../../assets/error.png";
import redCloud from "../../assets/cloud.png";


import AnimationElement from "../animationElement/AnimationElement";

type FoodData = {
  name: string;
  image: string;
  id: string;
  type: string;
  price: number;
  description: string;
}[];

const mainConfiguration = {};

const MainPage = () => {
  const { foodChoice } = useFoodContext();
  const [filteredData, setFilteredData] = useState<FoodData>([]);

  const { error, isLoading, data: fetchedData } = useHttp(
    "http://localhost:3000/meals",
    mainConfiguration
  );

  useEffect(() => {
    if (fetchedData) {
      const filtered = fetchedData.filter(
        (item) => item.type.toUpperCase() === foodChoice.toUpperCase()
      );
      setFilteredData(filtered);
    }
  }, [fetchedData, foodChoice]);

  return (
    <>
      {error ? (
        <Error
          img={errorImg}
          title="Sorry, we failed in loading meals..."
          message={error}
        />
      ) : (
        <div className={classes.container}>
          <AnimationElement link={redCloud} name="red cloud" />
          <div>
            <ul>
              {filteredData.map((item) => (
                <li key={item.id}>
                  <FoodCard food={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;
