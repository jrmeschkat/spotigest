import React, { FunctionComponent } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: FunctionComponent<InputProps> = ({
  className,
  ...rest
}) => {
  return <input className={`${className} bg-slate-800 rounded-md`} {...rest} />;
};
