import * as dotenv from 'dotenv';
import client, { Connection, Channel, ConsumeMessage } from 'amqplib';
import { convertTypeAcquisitionFromJson } from 'typescript';

class Consumer {
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

    public async consumeMessage(queueName: string) {
        let result = "";
        const consumer = (channel: Channel) => (message: ConsumeMessage | null) => {
            if (message) {

                channel.ack(message);
                result = message.content.toString();
            }
        }

        await this.channel.consume(queueName, consumer(this.channel));

        return result;
    }
}

export default Consumer