import { IProduct } from "./product";

export interface ICartItem extends IProduct {
	/*
	** The id of the cart item
	*/
	cart_item_id: number | null;
	quantity: number;
	size_id: number;
	size?: string;
	max_quantity?: number;
}
