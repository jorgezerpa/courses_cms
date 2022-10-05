import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize' 

const PRODUCTS_TABLE = 'products'

const ProductSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    }
}

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
    declare id: CreationOptional<number>;
    declare name: string;

    static associate(){

    }

    static config(sequelize:any){
        return {
            sequelize,
            tableName: PRODUCTS_TABLE,
            modelName: 'Product'
        }
    }
}

export {
    PRODUCTS_TABLE,
    ProductSchema,
    Product
}



