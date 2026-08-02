import mongoose, { Schema, model, models } from 'mongoose';


const ProductSchema = new Schema({
name: { type: String, required: true },
category: { type: String, default: 'allproduct' }, // product1, product2, ...
image: { type: String, required: true }, // URL
description: { type: String, required: true },
createdAt: { type: Date, default: Date.now }
});


// prevent model overwrite in dev
const Product = models.Product || model('Product', ProductSchema);
export default Product;