"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

const ButtonSubmit = ({ children, ...props }) => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} {...props}>
      {pending ? "Loading..." : children}
    </button>
  );
};

export default ButtonSubmit;
