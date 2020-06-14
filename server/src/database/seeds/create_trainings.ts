import Knex from 'knex';

export async function seed(knex: Knex){
   await knex('training').insert([
        {title: 'Excel', image: 'excel.svg'},
        {title: 'Word', image: 'word.svg'},
        {title: 'Mysql', image: 'mysql.svg'}
    ]);
}