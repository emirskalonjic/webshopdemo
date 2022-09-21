import { Router } from 'express';
import CartController from '../controllers/CartController';
import CartService from '../services/CartService';
import Producer from '../rabbitMQ/Producer';

const router = Router();
const cartService = new CartService();
const cartController = new CartController(cartService);

Producer.getInstance();

router.get('/cart/:id', cartController.cartDetails);
router.get('/carts-user/:id', cartController.cartByUserList);
router.get('/carts/', cartController.cartList);
router.post('/cart', cartController.createCart);

export default router