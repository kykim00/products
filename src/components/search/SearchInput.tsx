import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";

const SearchInput = () => {
  const [searchedValue, setSearchedValue] = useState("");
  const keyword = useDebounce(searchedValue);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams);
    if (keyword) setSearchParams({ ...currentParams, q: keyword });
    else setSearchParams({ ...currentParams, q: "" });
  }, [keyword]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedValue(e.target.value);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={handleChangeInput}
        value={searchedValue}
      />
    </div>
  );
};

export default SearchInput;
