import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import Order, { IOrder } from '../models/order';
import Consumer from '../rabbitMQ/Consumer';

class OrderService {

    constructor() {
        dotenv.config();
    }

    public async getOrderById(id: string): Promise<IOrder> {

        try {

            if (mongoose.connection.readyState == 1) {
                const order: IOrder | null = await Order.findOne({ uid: Number(id) });
    
                return order!;
            }

        } catch (error) {
            console.log(error);
        }
        
        return <IOrder>{};
    }

    public async getOrderList(): Promise<IOrder[]> {

        try {

            if (mongoose.connection.readyState == 1) {
                const orders: IOrder[] = await Order.find();
    
                return orders;
            }

        } catch (error) {
            console.log(error);
        }

        return <IOrder[]>{};
    }

    public async getMaxOrder(): Promise<IOrder | null> {
        try {

            if (mongoose.connection.readyState == 1) {
                const orderSorted: IOrder | null = await Order.findOne({}).sort({ uid:-1 }).limit(1);
    
                return orderSorted;
            }

        } catch (error) {
            console.log(error);
        }

        return <IOrder>{};
    }

    public async createOrder(input: any): Promise<IOrder> {
        try {
            
            if (mongoose.connection.readyState == 1) {
                const maxOrder: IOrder | null = await this.getMaxOrder();

                const order = new Order({
                    _id: new mongoose.Types.ObjectId(),
                    uid: (maxOrder != null && parseInt(maxOrder.uid)) ? (Number(maxOrder?.uid) + 1) : 1,
                    userId: input.userId,
                    cartId: input.uid,
                    date: input.date
                });
    
                const newCart: IOrder = await order.save();
                
                return order;
            }

        } catch (error) {
            console.log(error);
        }
        
        return <IOrder>{};
    }
}

export default OrderService 