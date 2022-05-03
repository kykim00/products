import React, { SyntheticEvent, useState } from "react";
import useFilterAndSearch from "../../hooks/useFilterAndSearch";
import CheckBoxInput from "./CheckBoxInput";

const initialCheckedItems = {
  place: [],
  type: [],
  leaders: [],
  partners: [],
};

const lists = [
  {
    place: ["온라인", "안국", "강남", "롯데백화점 잠실점 문화센터"],
  },
  { type: ["클럽장 클럽", "함께 만드는 클럽"] },
  { leaders: ["양완수", "김정규", "신혜성"] },
  { partners: ["조새롬", "정현진", "윤태진"] },
];

interface ICheckedItems {
  place: string[];
  type: string[];
  leaders: string[];
  partners: string[];
}

const FilterList = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [checkedItems, setCheckedItems] =
    useState<ICheckedItems>(initialCheckedItems);
  const [clickedMenu, setClickedMenu] = useState<string>("");

  const { searchedTitle, setSearchParams } = useFilterAndSearch();

  const hadleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const searchQuery = searchedTitle ? { q: searchedTitle } : null;

    setSearchParams({
      place: checkedItems.place.join("&"),
      type: checkedItems.type.join("&"),
      leaders: checkedItems.leaders.join("&"),
      partners: checkedItems.partners.join("&"),
      ...searchQuery,
    });

    setIsVisible(false);
  };
  const handleClickFilterMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsVisible(true);
    setClickedMenu(e.currentTarget.value);
  };

  const handleCheckFilterItem = (e: SyntheticEvent) => {
    const targetName = e.currentTarget.id!;
    const newCheckedItems = { ...checkedItems };

    if (!Object.values(newCheckedItems).flat(1).includes(targetName)) {
      newCheckedItems[clickedMenu as keyof ICheckedItems] = [
        ...newCheckedItems[clickedMenu as keyof ICheckedItems],
        targetName,
      ];
    } else {
      newCheckedItems[clickedMenu as keyof ICheckedItems] = [
        ...newCheckedItems[clickedMenu as keyof ICheckedItems].filter(
          (item) => item !== targetName
        ),
      ];
    }
    setCheckedItems(newCheckedItems);
  };

  return (
    <div>
      {lists.map((list) => (
        <>
          <button
            key={Object.keys(list)[0]}
            onClick={handleClickFilterMenu}
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
                onCheck={handleCheckFilterItem}
                checked={Object.values(checkedItems).flat(1).includes(item)}
              />
            ));
          }
          return null;
        })}

      {isVisible && <button onClick={hadleSubmit}>적용</button>}
    </div>
  );
};

export default FilterList;
