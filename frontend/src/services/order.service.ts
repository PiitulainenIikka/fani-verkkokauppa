import axios from "axios";
import TokenService from "./token.service";

export interface ICustomer {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    city: string;
    address: string;
    postcode: string;
}

interface IOrderProduct {
    product_id: number;
    quantity: number;
}

class OrderService extends TokenService {
    public createOrder(customer:ICustomer,products: IOrderProduct[]) {
        return axios.post("/api/orders", { customer, products}, this.makeHeader());
    }
}


export default new OrderService();