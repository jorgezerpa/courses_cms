import { Sequelize } from "sequelize";
import { Product, ProductSchema } from "./models/product";

const sequelize = new Sequelize('ecommerce_dashboard', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
  });

(async()=>{
    try {
        await sequelize.authenticate();
        console.log('DB connected');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})()

      //models
Product.init(ProductSchema, { sequelize }) 

sequelize.sync()

export default sequelize
  