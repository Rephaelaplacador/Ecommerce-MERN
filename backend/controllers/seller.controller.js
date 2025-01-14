import User from "../models/user.model.js";
import Product from "../models/product.model.js";


export const getSellers = async (req, res) => {
  try {
  
    const sellers = await User.find({ role: "seller" }).select("name email");
    res.status(200).json(sellers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sellers", error: error.message });
  }
};


export const getSellerProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.find({ seller: id });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found for this seller" });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};
