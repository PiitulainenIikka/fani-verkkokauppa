/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("product").del();
	await knex("product").insert([
		{
			id: 1,
			name: "Blue t-shirt",
			price: 50,
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis egestas blandit. Duis quis risus arcu. Vestibulum nec venenatis felis.",
			imageName: "tshirt88.jpg",
			sizeable: true,
		},
		{
			id: 2,
			name: "Blue cup",
			price: 15,
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis egestas blandit. Duis quis risus arcu. Vestibulum nec venenatis felis.",
			imageName: "darkbluecup.jpg",
			sizeable: false,
		},
		{
			id: 3,
			name: "Blue cup",
			price: 25,
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis egestas blandit. Duis quis risus arcu. Vestibulum nec venenatis felis.",
			imageName: "88cup.jpg",
			sizeable: false,
		},
		{
			id: 4,
			name: "Black/blue hoodie",
			price: 80,
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis egestas blandit. Duis quis risus arcu. Vestibulum nec venenatis felis.",
			imageName: "hoodie.jpg",
			sizeable: true,
		},
		{
			id: 5,
			name: "Paige/blue hoodie",
			price: 80,
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis egestas blandit. Duis quis risus arcu. Vestibulum nec venenatis felis.",
			imageName: "hoodie2.jpg",
			sizeable: true,
		},
		{
			id: 6,
			name: "Black/red hoodie",
			price: 80,
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis egestas blandit. Duis quis risus arcu. Vestibulum nec venenatis felis.",
			imageName: "hoodie3.jpg",
			sizeable: true,
		},
		{
			id: 7,
			name: "White/blue hoodie",
			price: 80,
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis egestas blandit. Duis quis risus arcu. Vestibulum nec venenatis felis.",
			imageName: "hoodie4.jpg",
			sizeable: true,
		},
		{
			id: 8,
			name: "Black hoodie",
			price: 80,
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis egestas blandit. Duis quis risus arcu. Vestibulum nec venenatis felis.",
			imageName: "hoodie5.jpg",
			sizeable: true,
		},
		{
			id: 9,
			name: "White hoodie",
			price: 80,
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis egestas blandit. Duis quis risus arcu. Vestibulum nec venenatis felis.",
			imageName: "hoodie6.jpg",
			sizeable: true,
		},
		{
			id: 10,
			name: "Black hoodie",
			price: 80,
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis egestas blandit. Duis quis risus arcu. Vestibulum nec venenatis felis.",
			imageName: "hoodie7.jpg",
			sizeable: true,
		},
	]);
};
