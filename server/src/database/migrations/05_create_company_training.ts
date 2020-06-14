import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('company_training',table => {
        table.increments('id').primary();

        table.integer('company_id')
            .notNullable()
            .references('id')
            .inTable('companies');

        table.integer('training_id')
            .notNullable()
            .references('id')
            .inTable('trainings');
    })
}

export async function down (knex: Knex){
    return knex.schema.dropTable('company_training');
} 