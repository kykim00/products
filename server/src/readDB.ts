import fs from "fs";
import { resolve } from "path";

const basePath = resolve();

const db = resolve(basePath, "src/db/products.json");

export const readDB = () => {
  try {
    return JSON.parse(fs.readFileSync(db, "utf8"));
  } catch (err) {
    console.error(err);
  }
};
