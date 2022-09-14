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
class CartController {
    constructor(cartService) {
        this.cartDetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield this.cartService.getCartById(req.params.id);
                res.status(200).json({ cart });
            }
            catch (error) {
                console.log(error);
            }
        });
        this.cartByUserList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const carts = yield this.cartService.getCartsByUserId(req.params.id);
                res.status(200).json({ carts });
            }
            catch (error) {
                console.log(error);
            }
        });
        this.cartList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const carts = yield this.cartService.getCartList();
                res.status(200).json({ carts });
            }
            catch (error) {
                console.log(error);
            }
        });
        this.createCart = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield this.cartService.createCart(req.body.data);
                res.status(200).json({ cart });
            }
            catch (error) {
                console.log(error);
            }
        });
        this.cartService = cartService;
    }
}
exports.default = CartController;
