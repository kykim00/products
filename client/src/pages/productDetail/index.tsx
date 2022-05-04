import styled from "@emotion/styled";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ProductItem from "../../components/products/Item";
import { GET_PRODUCT } from "../../graphql/products";
import { Product } from "../../types";
import { graphqlFetcher } from "../../utils/graphqlFetcher";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data } = useQuery<{ product: Product }>(["product", id], () =>
    graphqlFetcher(GET_PRODUCT, { id })
  );
  if (!data) return <div>상품이 존재하지 않습니다.</div>;

  return (
    <ProductDetailContainer>
      <h2>상세</h2>
      <ProductItem {...data.product} view="grid" />
    </ProductDetailContainer>
  );
};

const ProductDetailContainer = styled.div`
  width: 600px;
  margin: 0 auto;
`;
export default ProductDetailPage;
