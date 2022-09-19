import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
    uid: string,
    userId: string;
    cartId: string;
    date: string;
}

const OrderSchema: Schema = new Schema({
    uid: { type: String, required: true },
    userId: { type: String, required: true },
    cartId: { type: String, required: true },
    date: { type: String, required: true }
}, 
{ 
    versionKey: false 
});

export default mongoose.model<IOrder & mongoose.Document>('Order', OrderSchema);