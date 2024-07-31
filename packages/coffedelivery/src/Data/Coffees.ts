import { ICoffee } from "../models/Coffee";

export const COFFEES: ICoffee[] = [
	{
		id: 1,
		price: 990,
		description:
			"Bebida a base de café, uísque irlandês, açúcar e chantilly",
		title: "Expresso tradicional",
		thumbnail: require("../assets/Expresso.png"),
		type: "Tradicional"
	},
	{
		id: 2,
		price: 990,
		description:
			"Expresso diluído, menos intenso que o tradicional",
		title: "Expresso americano",
		thumbnail: require("../assets/ExpressoAmericano.png"),
		type: "Tradicional"
	},
	{
		id: 3,
		price: 990,
		description:
			"Café expresso tradicional com espuma cremosa",
		title: "Expresso Cremoso",
		thumbnail: require("../assets/ExpressoCremoso.png"),
		type: "Tradicional"
	},
	{
		id: 4,
		price: 990,
		description:
			"Café expresso com o dobro de leite e espuma cremosa",
		title: "Latte",
		thumbnail: require("../assets/Latte.png"),
		type: "Tradicional"
	},
	{
		id: 5,
		price: 990,
		description:
			"Café expresso com o dobro de leite e espuma cremosa",
		title: "Expresso Gelado",
		thumbnail: require("../assets/ExpressoGelado.png"),
		type: "Tradicional"
	},
	{
		id: 6,
		price: 990,
		description:
			"Bebida com canela feita de doses de café, leite e espuma",
		title: "Capuccino",
		thumbnail: require("../assets/Capuccino.png"),
		type: "Doce"
	},
	{
		id: 7,
		price: 990,
		description:
			"Café expresso com calda de chocolate, pouco leite e espuma",
		title: "Mocaccino",
		thumbnail: require("../assets/Mocaccino.png"),
		type: "Doce"
	},
	{
		id: 8,
		price: 990,
		description:
			"Bebida feita com chocolate dissolvida no leite quente e café",
		title: "Chocolate quente",
		thumbnail: require("../assets/ChocolateQuente.png"),
		type: "Doce"
	},
	{
		id: 9,
		price: 990,
		description:
			"Drink gelado de café expresso com rum, creme de leite e hortelã",
		title: "Cubano",
		thumbnail: require("../assets/Cubano.png"),
		type: "Especial"
	},
	{
		id: 10,
		price: 990,
		description:
			"Bebida adocicada preparada com café e leite de coco",
		title: "Havaiano",
		thumbnail: require("../assets/Havaiano.png"),
		type: "Especial"
	},
	{
		id: 11,
		price: 990,
		description:
			"Bebida preparada com grãos de café árabe e especiarias",
		title: "Árabe",
		thumbnail: require("../assets/Arabe.png"),
		type: "Especial"
	},
	{
		id: 12,
		price: 990,
		description:
			"Bebida a base de café, uísque irlandês, açucar e chantily",
		title: "Irlandês",
		thumbnail: require("../assets/Irlandes.png"),
		type: "Especial"
	},
	{
		id: 13,
		price: 990,
		description:
			"Popular bebida a base de café e leite",
		title: "Café com leite",
		thumbnail: require("../assets/CafeLeite.png"),
		type: "Tradicional"
	},
	{
		id: 14,
		price: 990,
		description:
			"Bebida feita com café espresso servido com um pouco de espuma.",
		title: "Macchiato",
		thumbnail: require("../assets/Macchiato.png"),
		type: "Tradicional"
	},
];
