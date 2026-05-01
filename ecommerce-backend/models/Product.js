import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    category: String,
    brand: String,
    countInStock: Number,

    // 🔥 CHANGE THIS
    images: [String], // ✅ multiple images

    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);