import { Resolver } from "./types";

const productResolver: Resolver = {
  Query: {
    products: (parent, { pageNum = 0 }, { db }, info) => {
      return db.products.slice(pageNum, +pageNum + 12) || [];
    },
    product: (parent, { id }, { db }, info) => {
      const found = db.products.find((item) => item.club.id === id);
      if (found) return found;
      return null;
    },
  },
};

export default productResolver;
