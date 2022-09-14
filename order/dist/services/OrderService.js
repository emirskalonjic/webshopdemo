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
const order_1 = __importDefault(require("../models/order"));
const mongoose_1 = __importDefault(require("mongoose"));
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
}
exports.default = OrderService;
