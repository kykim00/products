import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import Button from "../components/common/Button";
import FilterList from "../components/filters/FilterList";
import GridViewLayout from "../components/layouts/GridView";
import ListViewLayout from "../components/layouts/ListView";
import ProductList from "../components/products/List";
import SearchInput from "../components/search/SearchInput";
import GET_PRODUCTS from "../graphql/products";
import useFilterAndSearch from "../hooks/useFilterAndSearch";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { Product } from "../types";
import { graphqlFetcher } from "../utils/graphqlFetcher";

const MainPage = () => {
  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const intersecting = useIntersectionObserver(fetchMoreRef);
  const [view, setView] = useState("grid");
  const { place, type, leaders, partners, searchedTitle } =
    useFilterAndSearch();

  const { data, isSuccess, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<{ products: Product[] }>(
      ["products"],
      ({ pageParam = 0 }) =>
        graphqlFetcher(GET_PRODUCTS, { pageNum: pageParam }),
      {
        getNextPageParam: (_, allPages) => {
          return allPages.length * 12 < 78 ? allPages.length * 12 : undefined;
        },
      }
    );

  useEffect(() => {
    if (!intersecting || !isSuccess || !hasNextPage || isFetchingNextPage)
      return;
    fetchNextPage();
  }, [intersecting]);

  const handleViewChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    setView(e.currentTarget.value);
  };

  const ProductWrapper = view === "grid" ? GridViewLayout : ListViewLayout;

  if (!data) return null;

  /* 
  data: {                                               
    pages: [
      {products: [{...}]},
      {products: [{...}]},     =>     products = [{...}, {...}...]  
    ],
    pageParams: [undefined, ...]
  }
  */
  const products = data.pages
    .map((page) => Object.values(page.products))
    .reduce((acc, cur) => acc.concat(cur));

  return (
    <div>
      <Header>
        Main
        <Button variant="secondary" onClick={handleViewChange} value="grid">
          ????????????
        </Button>
        <Button onClick={handleViewChange} value="list">
          ????????????
        </Button>
      </Header>
      <FilterBar>
        <FilterList />
        <SearchInput />
      </FilterBar>
      <ProductWrapper>
        <ProductList
          list={products.filter((d) => {
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
      <div ref={fetchMoreRef}></div>
    </div>
  );
};

const Header = styled.h2`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const FilterBar = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: flex-start;
  gap: 10px;
`;
export default MainPage;
