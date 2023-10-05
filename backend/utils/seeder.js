const dotenv = require("dotenv");
const connectDatabase = require("../config/database");
const Product = require("../models/product");
const products = require("../data/products");
const { connect } = require("mongoose");

//Setting dotenv file
dotenv.config({ path: "config/config.env" });

connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("All products deleted successfully");

    await Product.insertMany(products);
    console.log("All products inserted successfully");

    process.exit();
  } catch (e) {
    console.log(e.message);
    process.exit();
  }
};

seedProducts();
