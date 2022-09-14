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
Object.defineProperty(exports, "__esModule", { value: true });
class OrderController {
    constructor(orderService) {
        this.orderDetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield this.orderService.getOrderById(req.params.id);
                res.status(200).json({ order });
            }
            catch (error) {
                console.log(error);
            }
        });
        this.orderList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield this.orderService.getOrderList();
                res.status(200).json({ orders });
            }
            catch (error) {
                console.log(error);
            }
        });
        this.orderService = orderService;
    }
}
exports.default = OrderController;
