"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CartController_1 = __importDefault(require("../controllers/CartController"));
const CartService_1 = __importDefault(require("../services/CartService"));
const router = (0, express_1.Router)();
const cartService = new CartService_1.default();
const cartController = new CartController_1.default(cartService);
router.get('/cart/:id', cartController.cartDetails);
router.get('/carts-user/:id', cartController.cartByUserList);
router.get('/carts/', cartController.cartList);
router.post('/cart', cartController.createCart);
exports.default = router;
