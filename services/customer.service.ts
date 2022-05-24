import { Customer } from "../models/customer.model";

class CustomerService {
  // Create new customer
  async create(decoded: any, phone: string) {
    try {
      if (decoded) {
        const newCustomer = await new Customer({
          user: decoded.id,
          phone,
        });
        const savedCustomer = await newCustomer.save();
        return savedCustomer;
      } else {
        return {
          success: false,
          message: "Has not logged in yet !!!",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Error while creating new customer",
      };
    }
  }

  // find all customers
  async findAllCustomers() {
    try {
      const customers = await Customer.find().populate(
        "user",
        "email fullName"
      );

      return customers;
    } catch (error) {
      return {
        success: false,
        message: "Error while searching new customer",
      };
    }
  }

  // delete customer
  async delete(userId: string) {
    try {
      const deletedCustomer = await Customer.findByIdAndDelete(userId);
      return deletedCustomer;
    } catch (error) {
      return {
        success: false,
        message: "Error while deleting new customer",
      };
    }
  }

  // Update Customer
  async update(userId: string, body: any) {
    try {
      const updatedCustomer = await Customer.findByIdAndUpdate(
        userId,
        {
          $set: body,
        },
        { new: true }
      );
      return updatedCustomer;
    } catch (error) {
      return {
        success: false,
        message: "Error while updating new customer",
      };
    }
  }
}

export default new CustomerService();
