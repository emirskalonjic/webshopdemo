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
const mongoose_1 = __importDefault(require("mongoose"));
const order_1 = __importDefault(require("../models/order"));
const Consumer_1 = __importDefault(require("../rabbitMQ/Consumer"));
class OrderService {
    constructor() {
        dotenv.config();
        Consumer_1.default.getInstance();
        Consumer_1.default.setOrderServis(this);
    }
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
