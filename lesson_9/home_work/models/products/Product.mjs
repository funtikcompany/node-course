import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: [3, "Title must be at least 3 characters long"],
        maxlength: [50, "Title must be at most 50 characters long"],
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 10000000,
    },
    count: {
        type: Number,
        required: true,
        min: 0,
        max: 1000,
    },
    image: {
        type: Buffer,
        required: true,
    },
});

const Product = mongoose.model("Product", productSchema);
export default Product;