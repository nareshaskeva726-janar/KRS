import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        category: String,
        qty: Number,
        image: String,
        images: [String],

        // NEW FIELDS
        video: String,              // video URL (cloudinary / local / mp4 link)
        videoDescription: String,   // text about video
    },
    { timestamps: true }
);

const Product =
    mongoose.models.Product ||
    mongoose.model("Product", productSchema);

export default Product;