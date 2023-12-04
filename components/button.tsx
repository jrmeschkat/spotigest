import { FunctionComponent } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FunctionComponent<ButtonProps> = ({
  className,
  ...rest
}) => {
  return (
    <button
      className={`${className} bg-slate-500 hover:bg-slate-400 active:bg-slate-600 p-1.5 rounded-md`}
      {...rest}
    />
  );
};
