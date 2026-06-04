import * as React from "react";
import "../Input/input.css";

export const Textarea = (
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) => {
  return <textarea className="input" {...props} />;
};
