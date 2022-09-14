import { Router } from 'express';
import CartController from '../controllers/CartController';
import CartService from '../services/CartService';

const router = Router();
const cartService = new CartService();
const cartController = new CartController(cartService);

router.get('/cart/:id', cartController.cartDetails);
router.get('/carts-user/:id', cartController.cartByUserList);
router.get('/carts/', cartController.cartList);
router.post('/cart', cartController.createCart);

export default router