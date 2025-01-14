import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    ratings: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;
