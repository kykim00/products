import React from "react";

interface CheckBoxInputProps {
  item: string;
  onCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

const CheckBoxInput = ({ item, onCheck, checked }: CheckBoxInputProps) => {
  return (
    <div>
      <input type="checkbox" id={item} onChange={onCheck} checked={checked} />
      <label htmlFor={item}>{item}</label>
    </div>
  );
};

export default React.memo(CheckBoxInput);
