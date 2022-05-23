import { Request, Response } from "express";
import { Customer } from "../models/customer.model";

class customerController {
  // create customer
  async createCustomer(req: Request, res: Response) {
    try {
      if (res.locals.jwt) {
        const newCustomer = await new Customer({
          fullname: req.body.fullname,
          user: res.locals.jwt.id,
          email: req.body.email,
          phone: req.body.phone,
        });
        const savedCustomer = await newCustomer.save();
        res.json(savedCustomer);
      } else {
        return res.json("Has not logged in yet !!!");
      }
    } catch (error) {
      res.json(error);
    }
  }

  // find all customers
  async findAllUser(req: Request, res: Response) {
    console.log(res.locals.jwt.email);
    try {
      const customers = await Customer.find();
      res.json(customers);
    } catch (error) {
      res.json(error);
    }
  }

  // delete customer
  async deleteCustomer(req: Request, res: Response) {
    try {
      await Customer.findByIdAndDelete(req.params.id);
      res.json("This Customer has been deleted !!!");
    } catch (error) {
      res.json(error);
    }
  }

  // Update Customer
  async updateCustomer(req: Request, res: Response) {
    try {
      const updatedCustomer = await Customer.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.json(updatedCustomer);
    } catch (error) {
      res.json(error);
    }
  }
}

export default new customerController();
