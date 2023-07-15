import React from 'react';

interface ButtonProps {
  label: string;
}

const Button = ({ label }: ButtonProps) => {
  return <button className="dse-button__container">{label}</button>;
};

export default Button;
