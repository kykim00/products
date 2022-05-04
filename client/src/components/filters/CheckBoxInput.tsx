import styled from "@emotion/styled";
import React from "react";

interface CheckBoxInputProps {
  item: string;
  onCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

const CheckBoxInput = ({ item, onCheck, checked }: CheckBoxInputProps) => {
  return (
    <div>
      <CheckBox
        type="checkbox"
        id={item}
        onChange={onCheck}
        checked={checked}
      />
      <label htmlFor={item}>{item}</label>
    </div>
  );
};

const CheckBox = styled.input`
  &:checked {
    background-color: #fff;
  }
`;
export default React.memo(CheckBoxInput);
