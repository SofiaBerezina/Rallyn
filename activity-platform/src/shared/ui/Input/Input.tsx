import * as React from "react";
import "./input.css";

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input className="input" {...props} />;
};

export default Input;
