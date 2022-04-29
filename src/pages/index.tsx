import { useQuery } from "react-query";
import ProductList from "../components/products/List";
import getProductsData from "../utils/getProductsData";

const MainPage = () => {
  const { data } = useQuery("products", () => getProductsData());
  if (!data) return null;
  console.log(data);
  return (
    <div>
      Main
      <ProductList list={data} />
    </div>
  );
};

export default MainPage;
