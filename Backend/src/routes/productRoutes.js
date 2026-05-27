import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { upload } from "../lib/upload.js";

const ProductRouter = express.Router();

// CREATE (with image upload)
ProductRouter.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  createProduct
);

// READ
ProductRouter.get("/", getProducts);
ProductRouter.get("/:id", getProduct);

// UPDATE
ProductRouter.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  updateProduct
);;

// DELETE
ProductRouter.delete("/:id", deleteProduct);

export default ProductRouter;