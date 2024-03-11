import React from "react";
import RegisterHeader from "./RegisterHeader";
import Footer from "../Footer";

interface IProps {
  children?: React.ReactNode;
}
function RegisterLayout({ children }: IProps) {
  return (
    <>
      <RegisterHeader />
      {children}
      <Footer />
    </>
  );
}

export default RegisterLayout;
