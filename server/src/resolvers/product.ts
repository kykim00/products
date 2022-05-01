import { Resolver } from "./types";

const productResolver: Resolver = {
  Query: {
    products: (parent, { pageNum = "" }, { db }, info) => {
      const fromIndex =
        db.products.findIndex((product) => product.club.id === pageNum) + 1;
      return db.products.slice(fromIndex, fromIndex + 12) || [];
    },
    product: (parent, { id }, { db }, info) => {
      const found = db.products.find((item) => item.club.id === id);
      if (found) return found;
      return null;
    },
  },
};

export default productResolver;
