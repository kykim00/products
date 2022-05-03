import { Product } from "../../types";
import ProductGridItem from "./Item";

interface ListProps {
  list: { products: Product[] }[];
  view: string;
}

const ProductList = ({ list, view }: ListProps) => (
  <>
    {list.map((page) =>
      page.products.map((product) => (
        <ProductGridItem {...product} key={product.club.id} view={view} />
      ))
    )}
  </>
);
export default ProductList;
