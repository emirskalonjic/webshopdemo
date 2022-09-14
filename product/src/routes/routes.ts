import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import ProductService from '../services/ProductService';

const router = Router();
const productService = new ProductService();
const productController = new ProductController(productService);

router.get('/product/:id', productController.productDetails);
router.get('/products/', productController.productList);

export default router 