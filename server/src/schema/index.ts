import { gql } from "apollo-server-express";
import productSchema from "./product";

const linkSchema = gql`
  type Query {
    _: Boolean
  }
`;

export default [linkSchema, productSchema];
