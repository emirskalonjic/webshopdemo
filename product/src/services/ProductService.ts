import Product, { IProduct } from '../models/product';
import mongoose from 'mongoose';

class ProductService {

    public async getProductById(id: string): Promise<IProduct> {

        try {

            if (mongoose.connection.readyState == 1) {
                const product: IProduct | null = await Product.findOne({ uid: Number(id) });
    
                return product!;
            }

        } catch (error) {
            console.log(error);
        }

        return <IProduct>{};
    }

    public async getProductList(): Promise<IProduct[]> {

        try {

            if (mongoose.connection.readyState == 1) {
                const products: IProduct[] = await Product.find();
    
                return products;
            }
        
        } catch (error) {
            console.log(error);
        }
        
        return <IProduct[]>{};
    }
}

export default ProductService 