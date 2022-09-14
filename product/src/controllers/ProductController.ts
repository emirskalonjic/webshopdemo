import { Request, Response } from 'express';
import { IProduct } from '../models/product';
import ProductService from '../services/ProductService';

class ProductController { 

    private readonly productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }

    public productDetails = async (req: Request, res: Response) => {
        try {
            const product: IProduct = await this.productService.getProductById(req.params.id);

            res.status(200).json({ product });
        } catch (error) {
            console.log(error);
        }
    }

    public productList = async(req: Request, res: Response) => {
        try {
            const products: IProduct[] = await this.productService.getProductList();

            res.status(200).json({ products });
        } catch (error) {
            console.log(error);
        }
    }
}

export default ProductController