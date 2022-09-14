import Order, { IOrder } from '../models/order';
import mongoose from 'mongoose';

class OrderService {

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
}

export default OrderService 