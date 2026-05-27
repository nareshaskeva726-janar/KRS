import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        category: String,
        qty: Number,
        image: String,        
        images: [String],     
    },
    { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product