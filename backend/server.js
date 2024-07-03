const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const sequelize = require('./database/database');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/products', async (req, res) => {
    
    try{
        const products = await Product.findAll();
        
        res.json({
            message: 'Product was successfully found.',
            data: products,
        });
    }catch(error){
        console.error('Error finding products:', error);
        res.status(500).json({error: 'Failed to find product'});
    }
})

app.post('/api/products', async (req, res) => {
    const {productName, productImage, productPrice} = req.body;
    
    try{
        const newProduct = await Product.create({
            name: productName,
            image: productImage,
            price: productPrice
        });

        console.log('Product created:', newProduct);

        res.json({
            message: 'Product was successfully added.',
            data: newProduct,
        });
    }catch(error){
        res.status(500).json({error: 'Failed to add product'});
    }
})

app.put('/api/products/:id', async (req, res) => {
    const {name, image, price} = req.body;
    const productId = req.params.id;
    try{
        const updatedProduct = await Product.update({
            name: name,
            image: image,
            price: price
        },{
            where: {
                id: productId
            }
        })

        if(!updatedProduct){
            return res.status(404).json({error: 'Product not found'});
        }

        console.log('Product updated:', updatedProduct);

        res.json({
            message: 'Product was successfully updated.',
            data: updatedProduct,
        });
    }catch(error){
        res.status(500).json({error: 'Failed to update product'});
    }
})

app.delete('/api/products/:id', async (req, res) => {
    const productId = req.params.id;
    
    try{
        const updatedProduct = await Product.destroy({
            where: {
                id: productId
            }
        })

        console.log('Product deleted');

        res.json({
            message: 'Product was successfully deleted.',
            data: updatedProduct,
        });
    }catch(error){
        res.status(500).json({error: 'Failed to delete product'});
    }
})

app.get('/api/cart', async (req, res) => {
    try {
        const carts = await Cart.findAll({
            attributes: [
                'name', 
                'image',
                [sequelize.fn('sum', sequelize.col('qty')), 'totalQty'],
                'price'
            ],
            group: ['name', 'image', 'price']
        });
        res.json({ data: carts });
    } catch (error) {
        console.error('Error fetching carts:', error);
        res.status(500).json({ error: 'Failed to fetch carts' });
    }
});

app.post('/api/cart', async (req, res) => {
    const {name, image, price, qty} = req.body;

    try{
        const newCartItem = await Cart.create({
            name: name,
            image: image,
            price: price,
            qty: qty
        });
        res.status(201).json({
            message: 'Product was successfully added to cart.',
            data: newCartItem,
        });
    }catch(error){
        res.status(500).json({error: 'Failed to add product to cart'});
        console.error('Error adding product to cart:', error);
    }
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})