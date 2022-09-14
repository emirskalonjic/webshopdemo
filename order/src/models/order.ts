import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
    uid: string,
    user: string;
    cart: string;
    date: string;
}

const OrderSchema: Schema = new Schema({
    uid: { type: String, required: true },
    user: { type: String, required: true },
    cart: { type: String, required: true },
    date: { type: String, required: true }
});

export default mongoose.model<IOrder & mongoose.Document>('Order', OrderSchema);