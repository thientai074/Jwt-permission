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
        throw Error("Has not logged in yet !!!");
      }
    } catch (error) {
      throw Error("Error while creating new customer");
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
      throw new Error("Error while searching customers");
    }
  }

  // delete customer
  async delete(userId: string) {
    try {
      const deletedCustomer = await Customer.findByIdAndDelete(userId);
      return deletedCustomer;
    } catch (error) {
      throw Error("Error while deleting customer");
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
      throw Error("Error while updating customer");
    }
  }
}

export default new CustomerService();
