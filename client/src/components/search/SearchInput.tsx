import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import SearchIcon from "../../assets/SearchIcon";
import useDebounce from "../../hooks/useDebounce";
import useFilterAndSearch from "../../hooks/useFilterAndSearch";

const SearchInput = () => {
  const [searchedValue, setSearchedValue] = useState("");
  const keyword = useDebounce(searchedValue);
  const { currentParams, setSearchParams } = useFilterAndSearch();

  useEffect(() => {
    if (keyword) setSearchParams({ ...currentParams, q: keyword });
    else setSearchParams({ ...currentParams, q: "" });
  }, [keyword]);

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedValue(e.target.value);
  };
  return (
    <SearchContainer>
      <label htmlFor="search-input">
        <SearchIcon />
      </label>
      <Input
        type="text"
        placeholder="Search"
        onChange={handleChangeSearchInput}
        value={searchedValue}
        id="search-input"
      />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 12px;
  background: #f7f7f5;
  border-radius: 40px;
  height: 20px;
`;

const Input = styled.input`
  border: none;
  padding: 0px;
  margin-left: 8px;
  background-color: transparent;
  font-size: 1.1em;
  &:focus {
    outline: none;
  }
  &::placeholder {
    opacity: 0.5;
  }
`;
export default SearchInput;
