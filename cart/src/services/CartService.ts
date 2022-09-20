import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import Cart, { ICart } from '../models/cart';
import Producer from '../rabbitMQ/Producer';

class CartService {

    constructor() {
        dotenv.config();
        Producer.getInstance();
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
                    
                    const message = JSON.stringify(newCart);

                    const status: boolean = Producer.sendMessage(message);

                    if (status) {
                        console.log("Message sent: " + message);
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