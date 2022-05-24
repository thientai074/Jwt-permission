import { Request, Response } from "express";
import CustomerService from "../services/customer.service";

class customerController {
  // create customer
  async createCustomer(req: Request, res: Response) {
    try {
      const { phone } = req.body;
      const reg = new RegExp("^[0-9]+$");
      const testOnlyNumberInPhone = reg.test(phone);
      if (!testOnlyNumberInPhone) {
        return res.json({
          success: false,
          message: "Invalid phone number",
        });
      }
      const decoded = res.locals.jwt;
      if (!decoded) {
        return res.json({ success: false, message: "You have to login" });
      }

      const newCustomer = await CustomerService.create(decoded, phone);
      res.json({
        success: true,
        data: newCustomer,
        message: "Created customer successfully",
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Creating customer failed",
      });
    }
  }

  // find all customers
  async findAllUser(req: Request, res: Response) {
    try {
      const customers = await CustomerService.findAllCustomers();
      res.json({
        success: true,
        data: customers,
        message: "Getted all customers successfully",
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Getting all customers successfully failed",
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
        data: deletedCustomer,
        message: "This Customer has been deleted !!!",
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Deleting customer failed",
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
        data: updatedCustomer,
        message: "Updated customer successfully",
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Updating customer failed",
      });
    }
  }
}

export default new customerController();
