import React, { useEffect, useState } from "react";
import Header from "../layouts/Header";
import TableProduct from "../components/TableProduct";
import ModalAddProduct from "../components/ModalAddProduct";
import ModalEditProduct from "../components/ModalEditProduct";
import ModalDeleteProduct from "../components/ModalDeleteProduct";

const ProductPage = () => {
    const [showModalAddProduct, setShowModalAddProduct] = useState(false);
    const [showModalEditProduct, setShowModalEditProduct] = useState(false);
    const [showModalDeleteProduct, setShowModalDeleteProduct] = useState(false);
    const [products, setProducts] = useState([]);
    const [productToEdit, setProductToEdit] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const [cartCount, setCartCount] = useState(0);

    // count cart from local storage
    useEffect(() => {
        const storedCartCount = localStorage.getItem('cartCount');
        if (storedCartCount) {
            setCartCount(parseInt(storedCartCount, 10));
        }
    }, []);

    // modal add
    const toggleModalAddProduct = () => {
        setShowModalAddProduct(!showModalAddProduct);
    }
    
    // modal edit
    const handleEditProduct = (products) => {
        const productFind = products.id;
        if(productFind){
            setProductToEdit(products);
            setShowModalEditProduct(true);
        }
    }

    const handleCloseEditModal = () => {
        setShowModalEditProduct(false);
        setProductToEdit(null);
    }

    const handleOpenDeleteModal = (productId) => {

        if(productId){
            setProductToDelete(productId);
            setShowModalDeleteProduct(true);
        }
    }

    const handleCloseDeleteModal = () => {
        setShowModalDeleteProduct(false);
        setProductToDelete(null);
    }

    const handleDeleteProduct = async () => {
        try{
            const response = await fetch(`http://localhost:5000/api/products/${productToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if(!response.ok){
                throw new Error('Failed to delete product');
            }

            const updatedProducts = products.filter((product) => product.id !== productToDelete.id);
            setProducts(updatedProducts);

            setProductToDelete(null);
            setShowModalDeleteProduct(false);

            setAlert({ message: 'Product updated successfully', type: 'success' });
        }catch(error){
            console.error('Error deleting product:', error);
        }
    }

    // alert
    const [alert, setAlert] = useState({ message: '', type: '' });

    return (

        <>
            <Header cartCount={cartCount} />
            <main className="p-8">
                <h1 className="text-3xl mt-4 mb-5">Manage Our Products</h1>

                <div>
                    {alert.message && (
                        <div className={`py-2 px-4 mb-4 rounded ${alert.type === 'success' ? 'bg-green-400' : 'bg-red-400'} text-white`}>
                            {alert.message}
                        </div>
                    )}

                    <button className="my-3 px-4 py-2 bg-sky-700 hover:bg-sky-800 active:bg-sky-900 text-white rounded"
                            onClick={toggleModalAddProduct}>
                        <span className="material-symbols-outlined text-sm font-bold">
                            add
                        </span>
                        Add New Product
                    </button>
                    <TableProduct
                    productsProp={products}
                    onEdit={handleEditProduct}
                    onDelete={handleOpenDeleteModal}/>
                </div>

                {showModalAddProduct &&
                    <ModalAddProduct
                    alert={alert}
                    setAlert={setAlert}
                    products={products}
                    setProducts={setProducts}
                    onClose={toggleModalAddProduct}/>}

                {showModalEditProduct &&
                    <ModalEditProduct
                    productToEdit={productToEdit}
                    setAlert={setAlert}
                    setProducts={setProducts}
                    onClose={handleCloseEditModal}/>}

                {showModalDeleteProduct &&
                    <ModalDeleteProduct
                        setAlert={setAlert}
                        productToDelete={productToDelete}
                        onDelete={handleDeleteProduct}
                        onClose={handleCloseDeleteModal}
                    />}
            </main>
        </>
    )
};

export default ProductPage;