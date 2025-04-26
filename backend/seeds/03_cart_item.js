/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('cart_item').del()
  await knex('cart_item').insert([
    {id: 1, customer_id: 1, quantity: 1, product_id: 1},
    {id: 2, customer_id: 1, quantity: 1, product_id: 2},
    {id: 3, customer_id: 1, quantity: 1, product_id: 3},
  ]);
};
