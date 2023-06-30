const knex = require('../db/knex.js');

const listAllProducts = async () => {
    const data = await knex.raw(`SELECT * FROM "product";`);
    return data.rows;
}

const getProductById = async (productId) => {
    //const productId = parseInt(req.params.id);
    //console.log(productId)
    try {
      const product = await knex('product').where('product_id', productId).first();
  
      if (!product) {
        return 0
      }
  
      return product
    } catch (error) {
      console.error('Error retrieving product by ID', error);
      return -1
    }
  };

  const editProductById = async (id,product)=>{
    try{
        const res = await knex('product').where('product_id',id).update(product);
        if(res){
            return 1
        }
        else{
            return 0
        }
    }
        catch(err){
            return -1
        }
    

  }

module.exports = {
    listAllProducts,
    getProductById,
    editProductById,
}