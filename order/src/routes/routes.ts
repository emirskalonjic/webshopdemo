import { Router } from 'express';
import OrderController from '../controllers/OrderController';
import OrderService from '../services/OrderService';

const router = Router();
const orderService = new OrderService();
const orderController = new OrderController(orderService);

router.get('/order/:id', orderController.orderDetails);
router.get('/orders/', orderController.orderList);
router.post('/order', orderController.createOrder);

export default router