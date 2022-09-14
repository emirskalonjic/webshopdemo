"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = __importDefault(require("../controllers/ProductController"));
const ProductService_1 = __importDefault(require("../services/ProductService"));
const router = (0, express_1.Router)();
const productService = new ProductService_1.default();
const productController = new ProductController_1.default(productService);
router.get('/product/:id', productController.productDetails);
router.get('/products/', productController.productList);
exports.default = router;
