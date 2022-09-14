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
class ProductController {
    constructor(productService) {
        this.productDetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.productService.getProductById(req.params.id);
                res.status(200).json({ product });
            }
            catch (error) {
                console.log(error);
            }
        });
        this.productList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.productService.getProductList();
                res.status(200).json({ products });
            }
            catch (error) {
                console.log(error);
            }
        });
        this.productService = productService;
    }
}
exports.default = ProductController;
