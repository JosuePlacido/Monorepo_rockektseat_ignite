import { ImageSourcePropType } from "react-native";

export interface ICoffee {
	id: number;
	title: string;
	description: string;
	type: "Tradicional" | "Doce" | "Especial";
	price: number;
	thumbnail: ImageSourcePropType;
}
export interface ICartCoffee {
	id: number;
	title: string;
	price: number;
	thumbnail: ImageSourcePropType;
	size: string;
	count: number;
}
