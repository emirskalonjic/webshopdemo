"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OrderController_1 = __importDefault(require("../controllers/OrderController"));
const OrderService_1 = __importDefault(require("../services/OrderService"));
const router = (0, express_1.Router)();
const orderService = new OrderService_1.default();
const orderController = new OrderController_1.default(orderService);
router.get('/order/:id', orderController.orderDetails);
router.get('/orders/', orderController.orderList);
exports.default = router;
