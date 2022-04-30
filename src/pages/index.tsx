import React, { useState } from "react";
import { useQuery } from "react-query";
import GridViewLayout from "../components/layouts/GridView";
import ListViewLayout from "../components/layouts/ListView";
import ProductList from "../components/products/List";
import getProductsData from "../utils/getProductsData";

const MainPage = () => {
  const { data } = useQuery("products", () => getProductsData());
  const [view, setView] = useState("grid");

  const handleViewChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    setView(e.currentTarget.value);
  };

  const ProductWrapper = view === "grid" ? GridViewLayout : ListViewLayout;
  if (!data) return null;
  console.log(data);
  return (
    <div>
      Main
      <button onClick={handleViewChange} value="grid">
        그리드뷰
      </button>
      <button onClick={handleViewChange} value="list">
        리스트뷰
      </button>
      <ProductWrapper>
        <ProductList list={data} view={view} />
      </ProductWrapper>
    </div>
  );
};

export default MainPage;
