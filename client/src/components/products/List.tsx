import { Product } from "../../types";
import ProductItem from "./Item";

interface ListProps {
  list: Product[];
  view: string;
}

const ProductList = ({ list, view }: ListProps) => (
  <>
    {list.map((product) => (
      <ProductItem {...product} key={product.club.id} view={view} />
    ))}
  </>
);
export default ProductList;
