import React, { createContext } from "react";
import { ICartItem } from "../../models/cart";
import cartService from "../../services/cart.service";
import TokenService from "../../services/token.service";
import { useToastContext } from "./ToastContext";




const CxCart = createContext({
	addToCart: (item: ICartItem) => { },
	subtractQuantity: (item: ICartItem) => { },
	cartItems: [] as ICartItem[],
	cartTotal: 0,
	removeFromCart: (item: ICartItem) => { },
	clearCart: () => { },
	incrementQuantity: (item: ICartItem) => { },
	RefreshCart: () => { }
});

const CartContext = ({ children }: React.PropsWithChildren) => {
	const [cartItems, setCartItems] = React.useState<ICartItem[]>([]);
	const [cartTotal, setCartTotal] = React.useState(0);

	const { showToast } = useToastContext();

	React.useEffect(() => {
		setCartTotal(
			cartItems.reduce(
				(acc: number, item: ICartItem) => acc + item.price * item.quantity,
				0
			)
		);
	}, [cartItems]);

	const addToCart = (item: ICartItem) => {
		if (!TokenService.getToken()) {
			setCartItems([...cartItems, item]);
			return;
		} else {
			showToast(item, "success");
			cartService.addToCart(item.id, item.quantity, item.size_id).then(() => {
				RefreshCart();
			});
		}
	};

	const incrementQuantity = (item: ICartItem) => {
		if (item.max_quantity === item.quantity) {
			return;
		}
		if (!TokenService.hasToken()) {
			setCartItems(
				cartItems.map((cartItem) => {
					if (cartItem.id === item.id) {
						cartItem.quantity = cartItem.quantity + 1;
					}
					return cartItem;
				})
			);
			return;
		} else {
			cartService.updateCart(item.cart_item_id as number, item.quantity + 1).then(() => {
				RefreshCart();
			});
		}
	};

	const subtractQuantity = (item: ICartItem) => {
		if (!TokenService.hasToken()) {
			setCartItems(
				cartItems.map((cartItem) => {
					if (cartItem.id === item.id) {
						cartItem.quantity = cartItem.quantity - 1;
					}
					return cartItem;
				})
			);
			return;
		}
		cartService.updateCart(item.cart_item_id as number, item.quantity - 1).then(() => {
			RefreshCart();
		});
	};

	const removeFromCart = (item: ICartItem) => {
		if (!TokenService.hasToken()) {
			setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
			return;
		}
		cartService.removeFromCart(item.cart_item_id as number).then(() => {
			RefreshCart();
		});
	};

	const clearCart = () => {
		if (!TokenService.hasToken()) {
			setCartItems([]);
			return;
		}
		cartService.ClearCart().then(() => {
			RefreshCart();
		});
	};

	const RefreshCart = () => {
		if (TokenService.hasToken()) {
			cartService
				.getCart()
				.then((res) => {
					setCartItems(res.data.cartItems);
				})
				.catch(() => { });
		}
	};

	return (
		<CxCart.Provider
			value={{
				addToCart,
				cartItems,
				cartTotal,
				clearCart,
				removeFromCart,
				subtractQuantity,
				incrementQuantity,
				RefreshCart,
			}}>
			{children}
		</CxCart.Provider>
	);
};

export const useCart = () => {
	const context = React.useContext(CxCart);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};

export default CartContext;
