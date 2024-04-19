import React, { useState } from "react";
import Button from "./Button";

type ErrorMessage = {
  title: string;
  message: string;
  img: string;
};

const Error: React.FC<ErrorMessage> = ({ title, message, img }) => {
  const [close, setClosing] = useState<boolean>(false);

  const handleCloseMessage = () => {
    setClosing(true);
  };

  return (
    !close && (
      <div className="error">
        <h1>{title}</h1>
        <img src={img} alt={title} />
        <p>{message}</p>
        <Button onClick={handleCloseMessage}>Close</Button>
      </div>
    )
  );
};

export default Error;
