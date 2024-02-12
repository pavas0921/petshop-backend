import express from "express";
import {
  createCustomer, getCustomerByCompany, updateCustomerById, updateCustomerStatusById
} from "../controllers/customer.controller.js";

const router = express.Router();

//create Company
router.post("/", createCustomer);
router.get("/company/:idCompany", getCustomerByCompany);
router.patch("/updateCustomer/:_id", updateCustomerById);
router.put("/updateStatus/:_id", updateCustomerStatusById);

export default router;
