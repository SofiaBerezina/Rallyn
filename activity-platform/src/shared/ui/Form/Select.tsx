import * as React from "react";
import "../Input/input.css";

export const Select = (
  props: React.SelectHTMLAttributes<HTMLSelectElement>,
) => {
  return <select className="input" {...props} />;
};
