import { gql } from "graphql-tag";

const GET_PRODUCTS = gql`
  query GET_PRODUCTS($pageNum: ID) {
    products(pageNum: $pageNum) {
      club {
        id
        name
        place
        type
        description
        coverUrl
      }
      leaders {
        name
      }
      partners {
        name
      }
      price
    }
  }
`;

export const GET_PRODUCT = gql`
  query GET_PRODUCT($id: ID!) {
    product(id: $id) {
      club {
        id
        name
        place
        type
        description
        coverUrl
      }
      leaders {
        name
      }
      partners {
        name
      }
      price
    }
  }
`;
export default GET_PRODUCTS;
