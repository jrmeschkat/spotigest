import React, { FunctionComponent } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: FunctionComponent<InputProps> = ({
  className,
  ...rest
}) => {
  return <input className={`${className} bg-slate-700 rounded-md`} {...rest} />;
};
