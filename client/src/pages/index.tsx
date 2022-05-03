import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import FilterList from "../components/filters/FilterList";
import GridViewLayout from "../components/layouts/GridView";
import ListViewLayout from "../components/layouts/ListView";
import ProductList from "../components/products/List";
import SearchInput from "../components/search/SearchInput";
import GET_PRODUCTS from "../graphql/products";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { Product } from "../types";
import { graphqlFetcher } from "../utils/graphqlFetcher";

const MainPage = () => {
  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const intersecting = useIntersectionObserver(fetchMoreRef);

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
    console.log(hasNextPage);
    if (!intersecting || !isSuccess || !hasNextPage || isFetchingNextPage)
      return;
    fetchNextPage();
  }, [intersecting]);

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
        <ProductList list={data.pages} view={view} />
        {/* <ProductList
          list={data.pages.products.filter((d) => {
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
        /> */}
      </ProductWrapper>
      <div ref={fetchMoreRef}></div>
    </div>
  );
};

export default MainPage;
