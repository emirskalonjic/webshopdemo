import * as dotenv from 'dotenv';
import client, { Connection, Channel, ConsumeMessage } from 'amqplib';
import OrderService from '../services/OrderService';

class Consumer {

    private static instance: Consumer;
    private static connection: Connection;
    private static channel: Channel;

    private static rabbitmqUrl: string = "";
    private static queueName: string = "";

    constructor() {
        dotenv.config();
        Consumer.createConnection();
    }

    public static getInstance(): Consumer {
        if (!Consumer.instance) {
            Consumer.instance = new Consumer();
        }

        this.rabbitmqUrl = process.env.RABBITMQ_URL!;
        this.queueName = process.env.QUEUE_NAME!;

        return Consumer.instance;
    }

    public static async createConnection() {
        try {
            this.connection = await client.connect(this.rabbitmqUrl);
            this.channel = await this.connection.createChannel();
            this.channel.assertQueue(this.queueName, { durable: true });

            console.log('Consumer Connection to RabbitMQ established');
        } catch (error) {
            console.log(error);
        }
    }

    public static checkConnection() {
        const checkConnection = (!this.connection || this.connection === undefined || this.connection.connection === undefined) ? false : true;
        const checkChannel = (!this.channel || this.channel === undefined) ? false : true;

        return checkConnection && checkChannel;
    }

    public static async consumeMessage(orderService: OrderService) {
        
        let results: string[] = [];

        try{

            const consumer = (channel: Channel) => (message: ConsumeMessage | null) => {
                if (message) {
    
                    const content = message.content.toString();
                    results.push(content);
                    console.log("Message received: " + content);

                    // Create order
                    const cart = JSON.parse(content);
                    if (cart) {
                        orderService.createOrder(cart);
                    }

                    channel.ack(message);
                }
            }
    
            await this.channel.consume(this.queueName, consumer(this.channel));

        } catch (error) {
            console.log(error);
        }

        return results;
    }
}

export default Consumer