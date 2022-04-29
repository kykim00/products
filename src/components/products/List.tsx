import { Product } from "../../types";
import ProductGridItem from "./Item";

const ProductList = ({ list }: { list: Product[] }) => {
  return (
    <div>
      {list.map((product, index) => (
        <ProductGridItem {...product} key={product.club.id} />
      ))}
    </div>
  );
};

export default ProductList;
