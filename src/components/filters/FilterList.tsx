import React, { SyntheticEvent, useState } from "react";
import CheckBoxInput from "./CheckBoxInput";

const lists = [
  {
    장소: ["온라인", "안국", "강남", "롯데백화점 잠실점 문화센터"],
  },
  { 클럽유형: ["클럽장 클럽", "함께 만드는 클럽"] },
  { 강사: ["양완수", "조새롬", "김정규", "정현진", "윤태진", "신혜성"] },
];

const FilterList = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [clickedMenu, setClickedMenu] = useState<string>("");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsVisible(true);
    setClickedMenu(e.currentTarget.value);
  };

  const handleCheck = (e: SyntheticEvent) => {
    const targetName = e.currentTarget.id!;
    if (checkedItems.includes(targetName)) {
      setCheckedItems(checkedItems.filter((i) => i !== targetName));
    } else {
      setCheckedItems([...checkedItems, targetName]);
    }
  };

  return (
    <div>
      {lists.map((list) => (
        <>
          <button
            key={Object.keys(list)[0]}
            onClick={handleClick}
            value={Object.keys(list)[0]}
          >
            {Object.keys(list)[0]}
          </button>
        </>
      ))}
      {isVisible &&
        lists.map((list) => {
          if (Object.keys(list)[0] === clickedMenu) {
            return Object.values(list)[0].map((item: string) => (
              <CheckBoxInput
                key={item}
                item={item}
                onCheck={handleCheck}
                checked={checkedItems.includes(item)}
              />
            ));
          }
          return null;
        })}

      {isVisible && <button onClick={() => setIsVisible(false)}>적용</button>}
    </div>
  );
};

export default FilterList;
