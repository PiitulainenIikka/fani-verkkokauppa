import axios from "axios";

export interface ISize {
	id: number;
	size?: string;
	product_id: number;
	stock: number;
}

class ProductService {
	public getAllProducts() {
		return axios.get("/api/products");
	}

	public getProduct(id: number) {
		return axios.get("/api/products/" + id);
	}

	public deleteProduct(id: number) {
		return axios.delete("/api/products/" + id);
	}

	public updateProduct(product: any) {
		return axios.put("/api/products/" + product.id, product);
	}

	public createProduct(product: any) {
		return axios.post("/api/products", product);
	}
	public getRandomProducts() {
		return axios.get("/api/products/random");
	}
	public getSizesForProduct(id: number) {
		return axios.get<ISize[]>("/api/products/" + id + "/stock");
	}
	public searchProducts(search: string) {
		return axios.get("/api/products/search/" + search);
	}
}

export default new ProductService();
