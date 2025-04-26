import React from "react";

class TokenService {

	private static Token: string | null = TokenService.getToken();

	public static setToken(token: string): void {
		localStorage.setItem("FANTOKEN", token);
		this.getToken();
		this.Token = token;
	}

	public static getToken(): string | null {
		return localStorage.getItem("FANTOKEN");
	}

	public static removeToken(): void {
		localStorage.removeItem("FANTOKEN");
	}

	public static hasToken(): boolean {
		return this.Token !== null;
	}

	public makeHeader = () => {
		if (TokenService.Token === null) {
			return {};
		}
		return { headers: { Authorization: `bearer ${TokenService.Token}` } };
	};

	public static logout = () => {
		TokenService.removeToken();
		window.location.href = "/";
	};
}

export default TokenService;
