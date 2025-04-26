import axios from "axios";
import TokenService from "./token.service";

interface ICustomerBase {
	first_name: string;
	last_name: string;
	email: string;
	address: string;
	city: string;
	postcode: string;
	phone: string;
}

interface IRegisterCustomer extends ICustomerBase {
	password: string;
}

interface ICustomer extends ICustomerBase {
	id: number;
}

interface ILoginCustomer {
	username: string;
	password: string;
}

class customerService extends TokenService {
	public register(customer: IRegisterCustomer) {
		return axios.post(`/api/register`, { ...customer });
	}
	public login(customer: ILoginCustomer) {
		return axios.post(`/api/login`, { customer });
	}
	public getCustomer() {
		if (!TokenService.hasToken()) {
			return Promise.resolve({
				data: null,
			});
		} else {
			return axios.get(`/api/customer`, this.makeHeader());
		}
	}
	public getCustomersOrders() {
		return axios.get(`/api/orders`, this.makeHeader());
	}
	public updateCustomer(customer: ICustomerBase) {
		return axios.put(`/api/customer`, { ...customer }, this.makeHeader());
	}
}

export default new customerService();
