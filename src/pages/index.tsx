import { useQuery } from "react-query";
import getProductsData from "../utils/getProductsData";

const MainPage = () => {
  const { data } = useQuery("products", () => getProductsData());
  if (!data) return null;
  console.log(data);
  return <div>Main</div>;
};

export default MainPage;
