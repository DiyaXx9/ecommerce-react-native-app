import Product from "../models/Product.js";

// GET all products (with search + filter)
export const getProducts = async (req, res) => {
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const category = req.query.category
    ? { category: req.query.category }
    : {};

  const products = await Product.find({ ...keyword, ...category });

  res.json(products);
};

// GET single product
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// CREATE product (admin later)
export const createProduct = async (req, res) => {
  const product = new Product(req.body);
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};