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
const amqplib_1 = __importDefault(require("amqplib"));
class Consumer {
    constructor() {
        dotenv.config();
        Consumer.createConnection();
    }
    static setOrderServis(orderServis) {
        this.orderService = orderServis;
    }
    static getInstance() {
        if (!Consumer.instance) {
            Consumer.instance = new Consumer();
        }
        this.rabbitmqUrl = process.env.RABBITMQ_URL;
        this.queueName = process.env.QUEUE_NAME;
        return Consumer.instance;
    }
    static createConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.connection = yield amqplib_1.default.connect(this.rabbitmqUrl);
                this.channel = yield this.connection.createChannel();
                this.channel.assertQueue(this.queueName, { durable: true });
                console.log("Consumer Connection to RabbitMQ established");
                this.consumeMessage();
                console.log("Consumer start consuming the messages...");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static checkConnection() {
        const checkConnection = (!this.connection || this.connection === undefined || this.connection.connection === undefined) ? false : true;
        const checkChannel = (!this.channel || this.channel === undefined) ? false : true;
        return checkConnection && checkChannel;
    }
    static consumeMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            let results = [];
            try {
                const consumer = (channel) => (message) => {
                    if (message) {
                        const content = message.content.toString();
                        results.push(content);
                        console.log("Message received: " + content);
                        // Create order
                        const cart = JSON.parse(content);
                        if (cart) {
                            this.orderService.createOrder(cart);
                        }
                        channel.ack(message);
                    }
                };
                yield this.channel.consume(this.queueName, consumer(this.channel));
            }
            catch (error) {
                console.log(error);
            }
            return results;
        });
    }
}
Consumer.rabbitmqUrl = "";
Consumer.queueName = "";
exports.default = Consumer;
