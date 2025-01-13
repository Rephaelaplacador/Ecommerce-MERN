import Product from "../models/product.model.js";
import cloudinary from "../lib/cloudinary.js";
import redis from "../lib/redis.js";


export const getAllProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, minPrice, maxPrice, isFeatured, sort = "-createdAt" } = req.query;

        const filters = {};
        if (minPrice) filters.price = { $gte: parseFloat(minPrice) };
        if (maxPrice) filters.price = { ...filters.price, $lte: parseFloat(maxPrice) };
        if (isFeatured) filters.isFeatured = isFeatured === "true";

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const products = await Product.find(filters).sort(sort).skip(skip).limit(parseInt(limit));
        const totalProducts = await Product.countDocuments(filters);

        res.json({
            total: totalProducts,
            page: parseInt(page),
            limit: parseInt(limit),
            products,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await redis.get("featured_products");
        if (featuredProducts) {
            return res.json(JSON.parse(featuredProducts));
        }

        featuredProducts = await Product.find({ isFeatured: true }).lean();

        await redis.set("featured_products", JSON.stringify(featuredProducts));

        res.json(featuredProducts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



export const createProduct = async (req, res) => {
	try {
		const { name, description, price, image, category } = req.body;

		let cloudinaryResponse = null;

		if (image) {
			cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
		}

		const product = await Product.create({
			name,
			description,
			price,
			image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
			category,
		});

		res.status(201).json(product);
	} catch (error) {
		console.log("Error in createProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};


export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0];
            try {
                await cloudinary.uploader.destroy(publicId);
                console.log("Deleted image from cloudinary");
            } catch (error) {
                console.log("Error deleting image from cloudinary", error.message);
            }
        }

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log("Error in deleteProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const getRecommendedProducts = async (req, res) => {

    try {
        const products = await Product.aggregate([
            {
                $sample: {
                    size: 3
                }
            },
            {
                $project: {
                    name: 1,
                    description: 1,
                    price: 1,
                    image: 1,
                    category: 1
                }
            }
        ])

        res.json(products)
    } catch (error) {
        console.log("Error in getRecommendeProducts controller", error.message);
        res.status(500).json({ message: "Server error", message: error.message });
    }
};

export const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    try {

        const products = await Product.find({ category });
        res.json({products});

    } catch (error) {
        console.log("Error in getProductsByCategory controller", error.message);
        res.status(500).json({ message: "Server error", message: error.message });
    }
};

export const toggleFeaturedProduct = async (req, res) => {

    try {
        const product = await Product.findById(req.params.id);
        if(product) {
            product.isFeatured = !product.isFeatured;
            const updatedProduct = await product.save();
            await updateFeaturedProductsCache();
            res.json(updatedProduct);
        } else {
            res.status(404).json({
                message: "Product not found"
            });
        }
    } catch (error) {
        console.log("Error in toggleFeaturedProduct controller", error.message);
        res.status(500).json({ message: "Server error", message: error.message });
    }
}

async function updateFeaturedProductsCache() {
    try {
        const featuredProducts = await Product.find({ isFeatured: true }).lean();
        await redis.set("featured_products", JSON.stringify(featuredProducts));
    } catch (error) {
        console.log("error in update cache function");
    }
}

export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        
        console.log("Search keyword:", keyword);  // Log the keyword for debugging
        
        // Sanitize and validate keyword
        const sanitizedKeyword = keyword.trim();
        if (!sanitizedKeyword) {
            return res.status(400).json({ message: "Please provide a valid search keyword." });
        }

        const products = await Product.find({
            $or: [
                { name: { $regex: sanitizedKeyword, $options: "i" } },
                { description: { $regex: sanitizedKeyword, $options: "i" } }
            ]
        }).select("-photo");

        res.json({ products });
    } catch (error) {
        console.log("Error in searchProductController:", error);
        res.status(400).send({
            success: false,
            message: "Error in Search Product API",
            error,
        });
    }
};
