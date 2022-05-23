import { Request, Response } from "express";
import { Customer } from "../models/customer.model";
import CustomerService from "../services/customer.service";

class customerController {
  // create customer
  async createCustomer(req: Request, res: Response) {
    try {
      const { phone } = req.body;
      const decoded = res.locals.jwt;
      if (!decoded) {
        return res.json({ success: false, message: "You have to login" });
      }

      const newCustomer = await CustomerService.create(decoded, phone);
      res.json({
        success: true,
        newCustomer,
        message: "Created customer successfully",
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error,
      });
    }
  }

  // find all customers
  async findAllUser(req: Request, res: Response) {
    try {
      const customers = await CustomerService.findAllCustomers();
      res.json({
        success: true,
        customers,
        message: "Getted all customers successfully",
      });
    } catch (error: any) {
      return res.json({
        success: false,
        message: error.message,
      });
    }
  }

  // delete customer
  async deleteCustomer(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const deletedCustomer = await CustomerService.delete(userId);
      res.json({
        success: true,
        deletedCustomer,
        message: "This Customer has been deleted !!!",
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error,
      });
    }
  }

  // Update Customer
  async updateCustomer(req: Request, res: Response) {
    try {
      const body = req.body;
      const userId = req.params.id;
      const updatedCustomer = await CustomerService.update(userId, body);
      res.json({
        success: true,
        updatedCustomer,
        message: "Updated customer successfully",
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error,
      });
    }
  }
}

export default new customerController();
