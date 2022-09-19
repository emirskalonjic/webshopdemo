import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

type CartInput = {
    uid: number
    userId: number
    productId: number
    price: number
    date: string
}

type Product = {
    _id: number
    uid: number
    name: string
    description: string
    price: number
}

type Cart = {
    _id: number
    uid: number
    userId: number
    productId: number
    product: Product
    price: number
    date: string
}

type Order = {
    _id: number
    uid: number
    userId: number
    cart: Cart
    date: string
}

const getProduct = async (args: { id: number }): Promise<Product | any> => {

    try {
        axios.defaults.baseURL = process.env.PRODUCT_BASE_URL;

        const result = await axios.get(
            '/product/' + args.id, 
            {
                headers: {
                  Accept: 'application/json'
                }
            }
        )
    
        const productStringify = JSON.stringify(result.data.product);
        const productParsed: Product = JSON.parse(productStringify);

        return productParsed;

    } catch(error) {
        console.log(error);
    }
}

const getProducts = async (): Promise<Product[] | any> => {

    try {
        axios.defaults.baseURL = process.env.PRODUCT_BASE_URL;

        const result = await axios.get(
            '/products', 
            {
                headers: {
                  Accept: 'application/json'
                }
            }
        )
    
        const productsStringify = JSON.stringify(result.data.products);
        const productsParsed: Product[] = JSON.parse(productsStringify);

        return productsParsed;

    } catch(error) {
        console.log(error);
    }
}

const getCart = async (args: { id: number }): Promise<Cart | any> => {
    
    try {
        axios.defaults.baseURL = process.env.CART_BASE_URL;

        const result = await axios.get(
            '/cart/' + args.id, 
            {
                headers: {
                  Accept: 'application/json'
                }
            }
        )
    
        const cartStringify = JSON.stringify(result.data.cart);
        const cartParsed: Cart = JSON.parse(cartStringify);

        const prodArgs = {
            id: args.id
        }

        const product = await getProduct(prodArgs);
        cartParsed.product = product;

        return cartParsed;

    } catch(error) {
        console.log(error);
    }
}


const getCarts = async (): Promise<Cart[] | any> => {

    try {
        axios.defaults.baseURL = process.env.CART_BASE_URL;

        const result = await axios.get(
            '/carts', 
            {
                headers: {
                  Accept: 'application/json'
                }
            }
        )
    
        const cartsStringify = JSON.stringify(result.data.carts);
        const cartsParsed: Cart[] = JSON.parse(cartsStringify);

        const products = await getProducts();
        cartsParsed.forEach(function (valueCart: Cart) {
            products.forEach(function (valueProduct: Product) {
                if (valueCart.productId == valueProduct.uid) {
                    valueCart.product = valueProduct;
                }
            }); 
        });

        return cartsParsed;

    } catch(error) {
        console.log(error);
    }
}

const getOrder = async (args: { id: number }): Promise<Order | any> => {

    try {
        axios.defaults.baseURL = process.env.ORDER_BASE_URL;

        const result = await axios.get(
            '/order/' + args.id, 
            {
                headers: {
                  Accept: 'application/json'
                }
            }
        )
    
        const orderStringify = JSON.stringify(result.data.order);
        const orderParsed: Order = JSON.parse(orderStringify);

        const cartArgs = {
            id: args.id
        }

        const cart = await getCart(cartArgs);
        const products = await getProducts();
        products.forEach(function (valueProduct: Product) {
            if (cart.productId == valueProduct.uid) {
                cart.product = valueProduct;
            }
        }); 

        orderParsed.cart = cart;
        return orderParsed;

    } catch(error) {
        console.log(error);
    }
}

// Mutation: Create Cart
const createCart = async (args: { input: CartInput }): Promise<Cart | any> => {

    try {
        axios.defaults.baseURL = process.env.CART_BASE_URL;

        const result = await axios.post(
            '/cart', 
            {
                data: args.input
            },
            {
                headers: {
                  Accept: 'application/json'
                }
            }
        )
        const cartStringify = JSON.stringify(result.data.cart);
        const cartParsed: Cart = JSON.parse(cartStringify);

        const prodArgs = {
            id: cartParsed.productId
        }

        const product = await getProduct(prodArgs);
        cartParsed.product = product;

        return cartParsed;

    } catch(error) {
        console.log(error);
    }
}

const root = {
    getProduct,
    getProducts,
    getCart,
    getCarts,
    getOrder,
    createCart
}

export default root