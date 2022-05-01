import axios from "axios";
import { Product } from "../types";
import { TOKEN } from "./constants";

const getProductsData = async () => {
  const response = await axios.get<Product[]>(
    "https://api.json-generator.com/templates/ePNAVU1sgGtQ/data",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  const data = await response.data;
  return data;
};

export default getProductsData;
