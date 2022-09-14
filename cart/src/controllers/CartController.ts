import { Request, Response } from 'express';
import { ICart } from '../models/cart';
import CartService from '../services/CartService';

class CartController { 

    private readonly cartService: CartService;

    constructor(cartService: CartService) {
        this.cartService = cartService;
    }

    public cartDetails = async (req: Request, res: Response) => {
        try {
            const cart: ICart = await this.cartService.getCartById(req.params.id);

            res.status(200).json({ cart });
        } catch (error) {
            console.log(error);
        }
    }

    public cartByUserList = async (req: Request, res: Response) => {
        try {
            const carts: ICart[] = await this.cartService.getCartsByUserId(req.params.id);

            res.status(200).json({ carts });
        } catch (error) {
            console.log(error);
        }
    }

    public cartList = async(req: Request, res: Response) => {
        try {
            const carts: ICart[] = await this.cartService.getCartList();

            res.status(200).json({ carts });
        } catch (error) {
            console.log(error);
        }
    }

    public createCart = async(req: Request, res: Response) => {
        try {
            const cart: ICart = await this.cartService.createCart(req.body.data);

            res.status(200).json({ cart });
        } catch (error) {
            console.log(error);
        }
    }
}

export default CartController