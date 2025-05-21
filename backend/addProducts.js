require('dotenv').config();
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

const Product = mongoose.model('Product', ProductSchema);

const products = [
  {
    name: 'Product 1',
    price: 25.99,
    imageUrl: 'https://via.placeholder.com/200x150?text=Product+1',
  },
  {
    name: 'Product 2',
    price: 35.5,
    imageUrl: 'https://via.placeholder.com/200x150?text=Product+2',
  },
  {
    name: 'Product 3',
    price: 15.0,
    imageUrl: 'https://via.placeholder.com/200x150?text=Product+3',
  },
];

async function addProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // لو حابب تمسح كل المنتجات القديمة قبل الإضافة:
    await Product.deleteMany({});
    console.log('Cleared old products');

    // أضف المنتجات الجديدة
    await Product.insertMany(products);
    console.log('Products added successfully');
    
    mongoose.connection.close();
  } catch (err) {
    console.error('Error adding products:', err);
  }
}

addProducts();

