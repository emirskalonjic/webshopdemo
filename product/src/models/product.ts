import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    uid: string,
    name: string;
    description: string;
    price: string;
}

const ProductSchema: Schema = new Schema({
    uid: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true }
});

export default mongoose.model<IProduct & mongoose.Document>('Product', ProductSchema);

