import styled from "@emotion/styled";
import React, { SyntheticEvent, useCallback, useState } from "react";
import useFilterAndSearch from "../../hooks/useFilterAndSearch";
import Button from "../common/Button";
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

  const handleApplyFilter = () => {
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

  const handleClickFilterMenu = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsVisible(true);
      setClickedMenu(e.currentTarget.value);
    },
    []
  );

  const handleResetFilter = () => {
    setCheckedItems(initialCheckedItems);
    setSearchParams({});
    setIsVisible(false);
  };

  const handleCheckFilterItem = useCallback(
    (e: SyntheticEvent) => {
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
    },
    [clickedMenu, checkedItems]
  );

  return (
    <FilterContainer>
      <ResetButton onClick={handleResetFilter}>초기화</ResetButton>
      {lists.map((list, index) => (
        <>
          <Button
            variant="secondary"
            key={`${Object.keys(list)[0]}-${index}`}
            onClick={handleClickFilterMenu}
            value={Object.keys(list)[0]}
          >
            {Object.keys(list)[0]}
          </Button>
        </>
      ))}
      {isVisible && (
        <>
          <FilterContent>
            <div>
              {lists.map((list) => {
                if (Object.keys(list)[0] === clickedMenu) {
                  return Object.values(list)[0].map(
                    (item: string, index: number) => (
                      <li key={`${item}-${index}`}>
                        <CheckBoxInput
                          item={item}
                          onCheck={handleCheckFilterItem}
                          checked={Object.values(checkedItems)
                            .flat(1)
                            .includes(item)}
                        />
                      </li>
                    )
                  );
                }
                return null;
              })}
            </div>
            <Button onClick={handleApplyFilter}>적용</Button>
          </FilterContent>
        </>
      )}
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  position: relative;
  margin-top: 5px;
  button {
    margin-right: 5px;
  }
  ul {
    padding-left: 55px;
  }
`;

const ResetButton = styled.button`
  background-color: #fff;
  font-weight: bold;
  border: none;
  cursor: pointer;
  text-decoration: underline;
`;

const FilterContent = styled.ul`
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10;
  button {
    width: 30%;
  }
`;
export default FilterList;
