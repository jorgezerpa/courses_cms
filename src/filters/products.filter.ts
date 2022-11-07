//IMPORTANT -> crete type for function´s return (all options should be optionals)
import { Product } from '../database/typeorm/entities'
import { ProductsFilterQuery } from '../types/filters'

interface FilterProduct extends Partial<Product>{}

export const productsfilter = (filterData:ProductsFilterQuery) => {
    const filter:FilterProduct = {
        isAvailable:true,
    }
    if(filterData.unavailable) delete filter.isAvailable  

    return filter
}