import { useEffect, useState } from "react";
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
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={handleChangeSearchInput}
        value={searchedValue}
      />
    </div>
  );
};

export default SearchInput;
