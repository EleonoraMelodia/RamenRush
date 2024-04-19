import { createContext, useContext, useState } from "react";
import React from "react";

type FoodState = {
  foodChoice: string;
  setFoodChoice: React.Dispatch<React.SetStateAction<string>>;
};

const FoodContext = createContext<FoodState | undefined>(undefined);

export const useFoodContext = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("useFoodContext must be used in FoodContextProvider");
  }
  return context;
};

export const FoodContextProvider: React.FC = ({ children }) => {
  const [foodChoice, setFoodChoice] = useState<string>("");

  return (
    <FoodContext.Provider value={{ foodChoice, setFoodChoice }}>
      {children}
    </FoodContext.Provider>
  );
};
