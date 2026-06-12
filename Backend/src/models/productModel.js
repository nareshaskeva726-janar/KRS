import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        category: String,
        qty: {
            type: Number,
            default: 0
        },
        image: String,
        images: [String],
        video: String,
        videoDescription: String,
    },
    { timestamps: true }
);

const Product =
    mongoose.models.Product ||
    mongoose.model("Product", productSchema);

export default Product;