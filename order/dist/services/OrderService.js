"use strict";
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
const mongoose_1 = __importDefault(require("mongoose"));
const order_1 = __importDefault(require("../models/order"));
const Consumer_1 = __importDefault(require("../rabbitMQ/Consumer"));
class OrderService {
    getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (mongoose_1.default.connection.readyState == 1) {
                    const order = yield order_1.default.findOne({ uid: Number(id) });
                    return order;
                }
            }
            catch (error) {
                console.log(error);
            }
            return {};
        });
    }
    getOrderList() {
        return __awaiter(this, void 0, void 0, function* () {
            // RabitMQ Consumer
            const consumer = new Consumer_1.default();
            const queueName = "webshopdemo_queue";
            const connection = yield consumer.createConnection();
            if (connection) {
                const channel = yield consumer.createChannel();
                if (channel != null) {
                    yield consumer.createQueue(queueName);
                    const message = yield consumer.consumeMessage(queueName);
                    if (message) {
                        const cart = JSON.parse(message);
                        if (cart) {
                            this.createOrder(cart);
                        }
                    }
                }
            }
            try {
                if (mongoose_1.default.connection.readyState == 1) {
                    const orders = yield order_1.default.find();
                    return orders;
                }
            }
            catch (error) {
                console.log(error);
            }
            return {};
        });
    }
    getMaxOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (mongoose_1.default.connection.readyState == 1) {
                    const orderSorted = yield order_1.default.findOne({}).sort({ uid: -1 }).limit(1);
                    return orderSorted;
                }
            }
            catch (error) {
                console.log(error);
            }
            return {};
        });
    }
    createOrder(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (mongoose_1.default.connection.readyState == 1) {
                    const maxOrder = yield this.getMaxOrder();
                    const order = new order_1.default({
                        _id: new mongoose_1.default.Types.ObjectId(),
                        uid: (maxOrder != null && parseInt(maxOrder.uid)) ? (Number(maxOrder === null || maxOrder === void 0 ? void 0 : maxOrder.uid) + 1) : 1,
                        userId: input.userId,
                        cartId: input.uid,
                        date: input.date
                    });
                    const newCart = yield order.save();
                    return order;
                }
            }
            catch (error) {
                console.log(error);
            }
            return {};
        });
    }
}
exports.default = OrderService;
