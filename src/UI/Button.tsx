import React from "react";
interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  icon?: boolean;
  type?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  icon,
  className,
}) => {
  let cssClasses = icon ? "button-icon" : "button";
  if (className) {
    cssClasses += " " + className;
  }

  return (
    <button className={cssClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
