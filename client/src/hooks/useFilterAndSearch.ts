import { useSearchParams } from "react-router-dom";

const useFilterAndSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const place = searchParams.get("place")?.split("&");
  const type = searchParams.get("type")?.split("&");
  const leaders = searchParams.get("leaders")?.split("&");
  const partners = searchParams.get("partners")?.split("&");
  const searchedTitle = searchParams.get("q");
  const currentParams = Object.fromEntries(searchParams);

  return {
    place,
    type,
    leaders,
    partners,
    searchedTitle,
    currentParams,
    setSearchParams,
  };
};
export default useFilterAndSearch;
