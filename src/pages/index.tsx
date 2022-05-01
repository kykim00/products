import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import FilterList from "../components/filters/FilterList";
import GridViewLayout from "../components/layouts/GridView";
import ListViewLayout from "../components/layouts/ListView";
import ProductList from "../components/products/List";
import SearchInput from "../components/search/SearchInput";
import getProductsData from "../utils/getProductsData";

const MainPage = () => {
  const { data } = useQuery("products", () => getProductsData());
  const [view, setView] = useState("grid");

  const [serchParams] = useSearchParams();

  const place = serchParams.get("place")?.split("&");
  const type = serchParams.get("type")?.split("&");
  const leaders = serchParams.get("leaders")?.split("&");
  const partners = serchParams.get("partners")?.split("&");
  const searchedTitle = serchParams.get("q");
  const handleViewChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    setView(e.currentTarget.value);
  };

  const ProductWrapper = view === "grid" ? GridViewLayout : ListViewLayout;
  if (!data) return null;

  return (
    <div>
      Main
      <button onClick={handleViewChange} value="grid">
        그리드뷰
      </button>
      <button onClick={handleViewChange} value="list">
        리스트뷰
      </button>
      <SearchInput />
      <FilterList />
      <ProductWrapper>
        <ProductList
          list={data.filter((d) => {
            if (place && place[0].length) {
              if (!place.includes(d.club.place)) return false;
            }
            if (type && type[0].length) {
              if (!type.includes(d.club.type)) return false;
            }
            if (leaders && leaders[0].length) {
              if (!leaders.includes(d.leaders[0].name)) return false;
            }
            if (partners && partners[0].length) {
              if (!partners.includes(d.partners[0].name)) return false;
            }
            if (searchedTitle) {
              return d.club.name.includes(searchedTitle);
            }
            return true;
          })}
          view={view}
        />
      </ProductWrapper>
    </div>
  );
};

export default MainPage;
