import axios from "axios";
import TokenService from "./token.service";


class CartService extends TokenService {
  public getCart() {
    return axios.get(`/api/cart`, this.makeHeader());
  }
  public addToCart(product_id: number, quantity: number, size_id: number) {
    return axios.post(`/api/cart`, { product_id,quantity,size_id }, this.makeHeader());
  }
  public removeFromCart(cart_item_id: number) {
    return axios.delete(`/api/cart`, { data: { cart_item_id }, ...this.makeHeader() });
  }
  public ClearCart() {
    return axios.delete(`/api/cart/all`, this.makeHeader());
  }
  public updateCart(cart_item_id:number , quantity:number) {
    return axios.put(`/api/cart`, { cart_item_id, quantity,}, this.makeHeader());
  }
}


export default new CartService();