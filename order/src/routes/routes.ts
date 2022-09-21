import { Router } from 'express';
import OrderController from '../controllers/OrderController';
import OrderService from '../services/OrderService';
import Consumer from '../rabbitMQ/Consumer';

const router = Router();
const orderService = new OrderService();
const orderController = new OrderController(orderService);

Consumer.getInstance();
Consumer.setOrderServis(orderService);

router.get('/order/:id', orderController.orderDetails);
router.get('/orders/', orderController.orderList);
router.post('/order', orderController.createOrder);

export default router