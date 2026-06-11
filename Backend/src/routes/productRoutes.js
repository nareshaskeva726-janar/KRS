import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { upload } from "../lib/upload.js";
import protect from "../middleware/authMiddleware.js";

const ProductRouter = express.Router();

// CREATE (with image upload)
ProductRouter.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 5 },
    { name: "video", maxCount: 1 },
  ]),
  protect,
  createProduct
);

// READ
ProductRouter.get("/",getProducts);
ProductRouter.get("/:id",  getProduct);

// UPDATE
ProductRouter.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 5 },
    { name: "video", maxCount: 1 },
  ]),
  protect,
  updateProduct
);

// DELETE
ProductRouter.delete("/:id", protect, deleteProduct);

export default ProductRouter;