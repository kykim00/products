import styled from "@emotion/styled";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ProductItem from "../../components/products/Item";
import getProductsData from "../../utils/getProductsData";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data } = useQuery("products", () => getProductsData());
  const product = data?.find((product) => product.club.id === id);

  if (!product) return <div>상품이 존재하지 않습니다.</div>;

  return (
    <ProductDetailContainer>
      상세
      <ProductItem {...product} view="grid" />
    </ProductDetailContainer>
  );
};

const ProductDetailContainer = styled.div`
  width: 600px;
  margin: 0 auto;
`;
export default ProductDetailPage;
