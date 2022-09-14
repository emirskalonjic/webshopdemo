"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv.config();
const getProduct = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        axios_1.default.defaults.baseURL = process.env.PRODUCT_BASE_URL;
        const result = yield axios_1.default.get('/product/' + args.id, {
            headers: {
                Accept: 'application/json'
            }
        });
        const productStringify = JSON.stringify(result.data.product);
        const productParsed = JSON.parse(productStringify);
        return productParsed;
    }
    catch (error) {
        console.log(error);
    }
});
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        axios_1.default.defaults.baseURL = process.env.PRODUCT_BASE_URL;
        const result = yield axios_1.default.get('/products', {
            headers: {
                Accept: 'application/json'
            }
        });
        const productsStringify = JSON.stringify(result.data.products);
        const productsParsed = JSON.parse(productsStringify);
        return productsParsed;
    }
    catch (error) {
        console.log(error);
    }
});
const getCart = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        axios_1.default.defaults.baseURL = process.env.CART_BASE_URL;
        const result = yield axios_1.default.get('/cart/' + args.id, {
            headers: {
                Accept: 'application/json'
            }
        });
        const cartStringify = JSON.stringify(result.data.cart);
        const cartParsed = JSON.parse(cartStringify);
        const prodArgs = {
            id: args.id
        };
        const product = yield getProduct(prodArgs);
        cartParsed.product = product;
        return cartParsed;
    }
    catch (error) {
        console.log(error);
    }
});
const getCarts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        axios_1.default.defaults.baseURL = process.env.CART_BASE_URL;
        const result = yield axios_1.default.get('/carts', {
            headers: {
                Accept: 'application/json'
            }
        });
        const cartsStringify = JSON.stringify(result.data.carts);
        const cartsParsed = JSON.parse(cartsStringify);
        const products = yield getProducts();
        cartsParsed.forEach(function (valueCart) {
            products.forEach(function (valueProduct) {
                if (valueCart.productId == valueProduct.uid) {
                    valueCart.product = valueProduct;
                }
            });
        });
        return cartsParsed;
    }
    catch (error) {
        console.log(error);
    }
});
const getOrder = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        axios_1.default.defaults.baseURL = process.env.ORDER_BASE_URL;
        const result = yield axios_1.default.get('/order/' + args.id, {
            headers: {
                Accept: 'application/json'
            }
        });
        const orderStringify = JSON.stringify(result.data.order);
        const orderParsed = JSON.parse(orderStringify);
        const cartArgs = {
            id: args.id
        };
        const cart = yield getCart(cartArgs);
        const products = yield getProducts();
        products.forEach(function (valueProduct) {
            if (cart.productId == valueProduct.uid) {
                cart.product = valueProduct;
            }
        });
        orderParsed.cart = cart;
        return orderParsed;
    }
    catch (error) {
        console.log(error);
    }
});
// Mutation: Create Cart
const createCart = (args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        axios_1.default.defaults.baseURL = process.env.CART_BASE_URL;
        const result = yield axios_1.default.post('/cart', {
            data: args.input
        }, {
            headers: {
                Accept: 'application/json'
            }
        });
        const cartStringify = JSON.stringify(result.data.cart);
        const cartParsed = JSON.parse(cartStringify);
        const prodArgs = {
            id: cartParsed.productId
        };
        const product = yield getProduct(prodArgs);
        cartParsed.product = product;
        return cartParsed;
    }
    catch (error) {
        console.log(error);
    }
});
const root = {
    getProduct,
    getProducts,
    getCart,
    getCarts,
    getOrder,
    createCart
};
exports.default = root;
