import express from "express";
import {
  createCustomer, getCustomerByCompany
} from "../controllers/customer.controller.js";
import { get } from "mongoose";

const router = express.Router();

//create Company
router.post("/", createCustomer);
router.get("/company/:idCompany", getCustomerByCompany);

export default router;
