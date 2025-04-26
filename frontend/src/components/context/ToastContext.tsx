import React from "react";
import { ICartItem } from "../../models/cart";
import AddToCartToast from "../toasts/addToCartToast";

type ToastType = "success" | "error" | "warning" | "info";

type Toast = {
	product: ICartItem;
	type: ToastType;
	show: boolean;
};

interface ToastContextType {
	showToast: (product: ICartItem, type: ToastType) => void;
	hideToast: () => void;
	toast: Toast;
}

const ToastContext = React.createContext<ToastContextType>({
	showToast: (product: ICartItem, type: ToastType) => {},
	hideToast: () => {},
	toast: {
		product: {} as ICartItem,
		type: "success",
		show: false,
	},
});

const ToastContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
	const [toast, setToast] = React.useState<Toast>({
		product: {} as ICartItem,
		type: "success",
		show: false,
	});

	const showToast = (product: ICartItem, type: ToastType) => {
		setToast({ product, type, show: true });

		setTimeout(() => {
			hideToast();
		}, 10000);
	};

	const hideToast = () => {
		setToast({ product: {} as ICartItem, type: "success", show: false });
	};

	return (
		<ToastContext.Provider
			value={{
				showToast,
				hideToast,
				toast,
			}}>
			{toast.show && <AddToCartToast product={toast.product} />}
			{}
			{children}
		</ToastContext.Provider>
	);
};

const useToastContext = () => {
	const context = React.useContext(ToastContext);

	if (context === undefined) {
		throw new Error("useToastContext must be used within a ToastContextProvider");
	}
	return context;
};

export { ToastContextProvider, useToastContext };
