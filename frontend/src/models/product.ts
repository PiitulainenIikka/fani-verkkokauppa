export interface IProduct {
	id: number;
	name: string;
	price: number;
	description: string;
	imageName: string;
	sizes?: string[];
	sizeable?: boolean;
}
