import express from "express";
const router = express.Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/auth.middleware");

import customerController from "../controlllers/customer.controller";

// delete Customer
router.delete(
  "/customer/:id",
  verifyTokenAndAuthorization,
  customerController.deleteCustomer
);

// update Customer
router.put(
  "/customer/:id",
  verifyTokenAndAuthorization,
  customerController.updateCustomer
);

// Create Customer
router.post("/customer", verifyToken, customerController.createCustomer);

// Find all customers
router.get("/customer", verifyTokenAndAdmin, customerController.findAllUser);

export default router;
