import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import ShopPage from "./pages/ShopPage";
import AppLayout from "./components/layout/AppLayout";
import "tw-elements";
import { BrowserRouter } from "react-router-dom";
import { Outlet, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import TokenService from "./services/token.service";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const PrivateOutlet: React.FC<React.PropsWithChildren> = ({ children }) => {
	const token = TokenService.hasToken();
	if (token) {
		return (
			<>
				{children}
				<Outlet />
			</>
		);
	}
	return <LoginPage />;
};
const NotPrivateOutlet: React.FC<React.PropsWithChildren> = ({ children }) => {
	const token = TokenService.hasToken();
	if (!token) {
		return (
			<>
				{children}
				<Outlet />
			</>
		);
	}
	return <ShopPage />;
};

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<AppLayout />}>
					<Route index element={<ShopPage />} />
					<Route
						path='login'
						element={
							<NotPrivateOutlet>
								<LoginPage />
							</NotPrivateOutlet>
						}
					/>
					<Route
						path='register'
						element={
							<NotPrivateOutlet>
								<RegisterPage />
							</NotPrivateOutlet>
						}
					/>
					<Route
						path='profile'
						element={
							<PrivateOutlet>
								<ProfilePage />
							</PrivateOutlet>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
