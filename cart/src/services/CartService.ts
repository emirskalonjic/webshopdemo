import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import Cart, { ICart } from '../models/cart';
import Producer from '../rabbitMQ/Producer';

class CartService {

    public producer: Producer;

    constructor() {
        dotenv.config();
        this.producer = new Producer();
    }

    public async getCartById(id: string): Promise<ICart> {

        try {

            if (mongoose.connection.readyState == 1) {
                const cart: ICart | null = await Cart.findOne({ uid: Number(id) });
    
                return cart!;
            }

        } catch (error) {
            console.log(error);
        }
        
        return <ICart>{};
    }

    public async getCartsByUserId(id: string): Promise<ICart[]> {

        try {

            if (mongoose.connection.readyState == 1) {
                const carts: ICart[] = await Cart.find({ user: Number(id) });
    
                return carts;
            }

        } catch (error) {
            console.log(error);
        }

        return <ICart[]>{};
    }

    public async getCartList(): Promise<ICart[]> {

        try {

            if (mongoose.connection.readyState == 1) {
                const carts: ICart[] = await Cart.find();
    
                return carts;
            }

        } catch (error) {
            console.log(error);
        }
        
        return <ICart[]>{};
    }

    public async createCart(input: any): Promise<ICart> {
        try {

            if (mongoose.connection.readyState == 1) {

                const cart = new Cart({
                    _id: new mongoose.Types.ObjectId(),
                    uid: input.uid,
                    userId: input.userId,
                    productId: input.productId,
                    price: input.price,
                    date: input.date
                });
    
                const newCart: ICart = await cart.save();
                
                // RabbitMQ Producer
                if (newCart) {
                    
                    const queueName: string = process.env.QUEUE_NAME!;
                    const message = JSON.stringify(newCart);

                    if (!this.producer.checkConnection()) {
                        await this.producer.createConnection();
                    } 
                    
                    if (this.producer.checkConnection()) {

                        if (!this.producer.checkChannel()) {
                            await this.producer.createChannel();
                        }

                        if (this.producer.checkChannel()) {
                            
                            await this.producer.createQueue(queueName);
                            const status: boolean = this.producer.sendMessage(queueName, message);
        
                            if (status) {
                                console.log("Message sent: " + message);
                            }
                        }
                    }
                }
    
                return cart;
            }

        } catch (error) {
            console.log(error);
        }
        
        return <ICart>{};
    }
}

export default CartService