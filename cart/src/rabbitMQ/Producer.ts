import * as dotenv from 'dotenv';
import client, { Connection, Channel } from 'amqplib';

class Producer {

    private connection!: Connection;
    private channel!: Channel;
    private queue!: client.Replies.AssertQueue;

    private rabbitmqUrl: string = "";

    constructor() {
        dotenv.config();
        this.rabbitmqUrl = process.env.RABBITMQ_URL!;
    }

    public async createConnection(): Promise<Connection> {

        this.connection = await client.connect(this.rabbitmqUrl);
        
        return this.connection;
    }
    
    public async createChannel(): Promise<Channel> {

        this.channel = await this.connection.createChannel();

        return this.channel;
    }

    public async createQueue(queueName: string) {
        this.queue = await this.channel.assertQueue(queueName);
    }

    public sendMessage(queueName: string, message: string): boolean {
        const sendReport: boolean = this.channel.sendToQueue(queueName, Buffer.from(message));

        return sendReport
    }

    public dispose() {
        this.channel.close();
        this.connection.close();
    }
}

export default Producer