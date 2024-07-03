import React, { useState } from "react";
import FormProduct from "../components/FormProduct";

const ModalAddProduct = ({alert, setAlert, products, setProducts, onClose}) => {
    // input
    const [productName, setProductName] = useState('');
    const [productImage, setProductImage] = useState('');
    const [productPrice, setProductPrice] = useState('');

    // handler input
    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    }

    const handleProductImageChange = (event) => {
        setProductImage(event.target.value);
    }

    const handleProductPriceChange = (event) => {
        setProductPrice(event.target.value);
    }
    // end handler input

    // close modal
    const handleCloseModal = () => {
        onClose();
    }

    // handler submit
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productName,
                    productImage,
                    productPrice: parseFloat(productPrice),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add product');
            }

            const newProduct = await response.json();
            console.log('Product was added', newProduct);

            // update product list
            setProducts([...products, newProduct]);
            setAlert({ message: 'Product added successfully', type: 'success' });

            setProductName('');
            setProductImage('');
            setProductPrice('');
        } catch (error) {
            console.error('Error adding product:', error);
            setAlert({ message: error.message || 'Failed to add product', type: 'error' });
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg relative">
                <h1 className="text-xl mb-4">Add New Product</h1>

                <button className="top-2 right-2 p-2 absolute" onClick={handleCloseModal}>
                    <span className="material-symbols-outlined text-xl font-bold">
                        close
                    </span>
                </button>
                {/* Tambahkan konten formulir atau komponen lain di sini */}
                <form onSubmit={handleSubmit}>
                    <FormProduct
                        type="text"
                        label="Product Name"
                        id="productName"
                        value={productName}
                        onChange={handleProductNameChange} />

                    <FormProduct
                        type="text"
                        label="Product Image"
                        id="productImage"
                        value={productImage}
                        onChange={handleProductImageChange} />

                    <FormProduct
                        type="number"
                        label="Product Price"
                        id="productPrice"
                        value={productPrice}
                        onChange={handleProductPriceChange} />


                    <div className="flex items-center justify-end mt-5">
                        <button type="submit" className="bg-blue-800 text-white py-2 px-3 rounded">
                            Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default ModalAddProduct;