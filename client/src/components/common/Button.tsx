import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  value?: string;
}
function Button({
  children,
  variant = "primary",
  onClick,
  value,
}: ButtonProps) {
  return (
    <ButtonStyled variant={variant} onClick={onClick} value={value}>
      {children}
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button<{ variant: string }>`
  padding: 5px 10px;
  height: 30px;
  background-color: #fff;
  border: 1px solid #0d6efd;
  border-radius: 3px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 8px;
  ${(props) =>
    props.variant === "primary"
      ? css`
          background-color: #5086ff;
          border: none;
          color: white;
        `
      : css`
          background-color: white;
          border: 1px solid #5086ff;
          color: #5086ff;
        `}
  &:first-child {
    margin-right: 20px;
  }
`;

export default Button;
