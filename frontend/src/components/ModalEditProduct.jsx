import React, { useState, useEffect } from "react";
import FormProduct from "../components/FormProduct";

const ModalEditProduct = ({ alert, setAlert, products, productToEdit, setProducts, onClose }) => {
    const [productName, setProductName] = useState('');
    const [productImage, setProductImage] = useState('');
    const [productPrice, setProductPrice] = useState('');

    useEffect(() => {
        if (productToEdit) {
            setProductName(productToEdit.name);
            setProductImage(productToEdit.image);
            setProductPrice(productToEdit.price.toString());
        }
    }, [productToEdit]);

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    }

    const handleProductImageChange = (event) => {
        setProductImage(event.target.value);
    }

    const handleProductPriceChange = (event) => {
        setProductPrice(event.target.value);
    }

    const handleCloseModal = () => {
        onClose();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/products/${productToEdit.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: productName,
                    image: productImage,
                    price :parseFloat(productPrice),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            const updatedProduct = await response.json();
            console.log('Product was updated', updatedProduct);

            // Update products list
            if(products && products.length > 0){
                const updatedProducts = products.map((product) =>
                    product.id === updatedProduct.id ? updatedProduct : product
                );
                setProducts(updatedProducts);
            }

            setAlert({ message: 'Product updated successfully', type: 'success' });
            onClose();
        } catch (error) {
            console.error('Error updating product:', error);
            setAlert({ message: error.message || 'Failed to update product', type: 'error' });
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg relative">
                <h1 className="text-xl mb-4">Edit Product</h1>

                <button className="top-2 right-2 p-2 absolute" onClick={handleCloseModal}>
                    <span className="material-symbols-outlined text-xl font-bold">
                        close
                    </span>
                </button>

                <form onSubmit={handleSubmit}>
                    <FormProduct
                        type="text"
                        label="Product Name"
                        id="productName"
                        value={productName}
                        onChange={handleProductNameChange}
                    />

                    <FormProduct
                        type="text"
                        label="Product Image"
                        id="productImage"
                        value={productImage}
                        onChange={handleProductImageChange}
                    />

                    <FormProduct
                        type="number"
                        label="Product Price"
                        id="productPrice"
                        value={productPrice}
                        onChange={handleProductPriceChange}
                    />

                    <div className="flex items-center justify-end mt-5">
                        <button type="submit" className="bg-blue-800 text-white py-2 px-3 rounded">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default ModalEditProduct;
