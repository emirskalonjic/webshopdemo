import { Request, Response } from 'express';
import { IOrder } from '../models/order';
import OrderService from '../services/OrderService';

class OrderController { 

    private readonly orderService: OrderService;

    constructor(orderService: OrderService) {
        this.orderService = orderService;
    }

    public orderDetails = async (req: Request, res: Response) => {
        try {
            const order: IOrder = await this.orderService.getOrderById(req.params.id);

            res.status(200).json({ order });
        } catch (error) {
            console.log(error);
        }
    }

    public orderList = async(req: Request, res: Response) => {
        try {
            const orders: IOrder[] = await this.orderService.getOrderList();

            res.status(200).json({ orders });
        } catch (error) {
            console.log(error);
        }
    }

    public createOrder = async(req: Request, res: Response) => {
        try {
            const order: IOrder = await this.orderService.createOrder(req.body);

            res.status(200).json({ order });
        } catch (error) {
            console.log(error);
        }
    }
}

export default OrderController