import React from 'react';

interface IProps {
  children?: React.ReactNode;
}
function RegisterLayout({ children }: IProps) {
  return (
    <>
      <div>RegisterLayout</div>
      {children}
    </>
  );
}

export default RegisterLayout;
