import * as dotenv from 'dotenv';
import client, { Connection, Channel } from 'amqplib';
class Producer {

    private static instance: Producer;
    private static connection: Connection;
    private static channel: Channel;

    private static rabbitmqUrl: string = "";
    private static queueName: string = "";

    constructor() {
        dotenv.config();
        Producer.createConnection();
    }

    public static getInstance(): Producer {
        if (!Producer.instance) {
            Producer.instance = new Producer();
        }

        this.rabbitmqUrl = process.env.RABBITMQ_URL!;
        this.queueName = process.env.QUEUE_NAME!;

        return Producer.instance;
    }

    public static async createConnection() {
        try {
            this.connection = await client.connect(this.rabbitmqUrl);
            this.channel = await this.connection.createChannel();
            this.channel.assertQueue(this.queueName, { durable: true });

            console.log('Producer Connection to RabbitMQ established');
        } catch (error) {
            console.log(error);
        }
    }

    public static checkConnection() {
        const checkConnection = (!this.connection || this.connection === undefined || this.connection.connection === undefined) ? false : true;
        const checkChannel = (!this.channel || this.channel === undefined) ? false : true;

        return checkConnection && checkChannel;
    }

    public static sendMessage(message: string): boolean {
        try {
            if (this.checkConnection()) {
                const sendReport: boolean = this.channel.sendToQueue(this.queueName, Buffer.from(message));
                return sendReport;
            }
        } catch (error) {
            console.log(error);
        }
        
        return false;
    }
}

export default Producer