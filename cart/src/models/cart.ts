import mongoose, { Schema, Document } from 'mongoose';

export interface ICart extends Document {
    uid: string,
    userId: string;
    productId: string;
    price: string;
    date: string;
}

const CartSchema: Schema = new Schema({
    uid: { type: String, required: true },
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    price: { type: String, required: true },
    date: { type: String, required: true }
}, 
{ 
    versionKey: false 
});

export default mongoose.model<ICart & mongoose.Document>('Cart', CartSchema);