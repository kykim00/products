import { gql } from "apollo-server-express";

const productSchema = gql`
  type Meeting {
    order: Int!
    startedAt: String!
    endedAt: String!
  }

  type Leader {
    name: String!
  }

  type Partner {
    name: String!
  }

  type Club {
    id: ID!
    name: String!
    place: String!
    description: String!
    type: String!
    coverUrl: String!
    meetings: [Meeting!]
  }

  type Product {
    club: Club
    leaders: [Leader!]
    partners: [Partner!]
    price: Int!
  }

  extend type Query {
    products(pageNum: ID): [Product!]
    product(id: ID!): Product
  }
`;

export default productSchema;
