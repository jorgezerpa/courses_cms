    //not used by the moment
    //the idea is extract the models instantiation from connection

import { Product, ProductSchema } from "./product";

function setupModels(sequelize:any){
    Product.init(ProductSchema, { sequelize }) 
}

export default setupModels 

