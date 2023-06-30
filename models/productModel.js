const knex = require('../db/knex.js');

const listAllProducts = async () => {
    const data = await knex.raw(`SELECT * FROM "product";`);
    return data.rows;
}

module.exports = {
    listAllProducts,
}