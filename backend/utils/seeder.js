const Product = require("../models/product");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");
const products = require("../data/products");
const { envPath } = require("../config");

//setting dotenv file
dotenv.config({ path: envPath });

connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Prodcuts are deleted");
    await Product.insertMany(products);
    console.log("All Products are added.");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};
seedProducts();
