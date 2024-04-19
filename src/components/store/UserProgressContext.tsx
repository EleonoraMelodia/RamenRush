import React, { useState } from "react";
import { createContext } from "react";

const UserProgressContext = createContext({
  progress: "",
  openCart: () => {},
  hideCart: () => {},
  openCheckout: () => {},
  closeCheckout: () => {},
});

export const UserProgressProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [userProgress, setUserProgress] = useState<string>("");

  const openCart = () => {
    setUserProgress("cart");
  };
  const hideCart = () => {
    setUserProgress("");
  };
  const openCheckout = () => {
    setUserProgress("checkout");
  };
  const closeCheckout = () => {
    setUserProgress("");
  };

  const UserProgressValue = {
    progress: userProgress,
    openCart,
    hideCart,
    openCheckout,
    closeCheckout,
  };

  return (
    <UserProgressContext.Provider value={UserProgressValue}>
      {children}
    </UserProgressContext.Provider>
  );
};

export default UserProgressContext;
