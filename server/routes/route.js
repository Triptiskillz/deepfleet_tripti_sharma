import express from "express";

import {
  showCategories,
  addCategory,
  updateCategory,
  removeCategory,
  showOneCategory,
} from "../controller/category.js";

import {
  showOneProduct,
  showProducts,
  addProduct,
  updateProduct,
  removeProduct,
} from "../controller/product.js";

import { addOrder, showOrdersByDate } from "../controller/order.js";

import { addTotal, showTotal } from "../controller/total.js";

const router = express.Router();

// Category routes
router.get("/showcategory/:id", showOneCategory); // Get a single category by ID
router.get("/showcategory", showCategories); // Get all categories
router.post("/addcategory", addCategory); // Add a new category
router.put("/updatecategory", updateCategory); // Update an existing category
router.delete("/removecategory/:id", removeCategory); // Remove a category by ID

// Product routes
router.get("/showproduct/:id", showOneProduct); // Get a single product by ID
router.get("/showproduct", showProducts); // Get all products
router.post("/addproduct", addProduct); // Add a new product
router.put("/updateproduct", updateProduct); // Update an existing product
router.delete("/removeproduct/:id", removeProduct); // Remove a product by ID

// Order routes
router.post("/order", addOrder); // Place a new order
router.get("/sales", showOrdersByDate); // Get orders (sales)

// Total routes
router.post("/total", addTotal); // Add total data
router.get("/showtotal", showTotal); // Get all total data

export default router;
