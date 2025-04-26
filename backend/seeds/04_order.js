/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('order').del()
  await knex('order').insert([
    {id: 1, customer_id: 1,status:'pending'},
    {id: 2, customer_id: 1,status:'pending'},
    {id: 3, customer_id: 2,status:'pending'},
  ]);
};
