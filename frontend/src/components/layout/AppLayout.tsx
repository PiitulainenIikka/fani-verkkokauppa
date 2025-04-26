import React from "react";
import CartContext, { useCart } from "../context/CartContext";
import { ToastContextProvider } from "../context/ToastContext";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import TokenService from "../../services/token.service";

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	
	const initHook = () => {
		const token = TokenService.getToken();
		if (token) {
			TokenService.setToken(token);
		}
	};

	React.useEffect(initHook, []);
	return (
		<>
			<ToastContextProvider>
				<CartContext>
					<div className='flex flex-col min-h-screen'>
						<NavBar />
						<div className='flex-1 flex flex-col mt-16 xl:mt-20'>
							<Outlet />
						</div>
						<Footer />
					</div>
				</CartContext>
			</ToastContextProvider>
		</>
	);
};

export default AppLayout;
