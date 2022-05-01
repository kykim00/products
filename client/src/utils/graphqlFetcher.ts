import request, { RequestDocument } from "graphql-request";

const BASE_URL = "http://localhost:8000/graphql";

export const graphqlFetcher = (query: RequestDocument, variables = {}) =>
  request(BASE_URL, query, variables);
