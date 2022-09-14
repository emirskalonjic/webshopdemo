import Cart, { ICart } from '../models/cart';
import mongoose from 'mongoose';

class CartService {

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
    
                cart.save();
    
                return cart;
            }

        } catch (error) {
            console.log(error);
        }
        
        return <ICart>{};
    }
}

export default CartService