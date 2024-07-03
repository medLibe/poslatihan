import React, { useEffect, useState } from "react";

const TableProduct = ({ productsProp, onEdit, onDelete }) => {
    const [products, setProducts] = useState([]);

    // get product data
    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products');
            const data = await response.json();
            setProducts(data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // format currency
    const formatCurrency = (amount) => {
        let formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        });

        return formatter.format(amount);
    }

    const handleOpenEditModal = (productId) => {
        const productToEdit = products.find(product => product.id === productId);
        onEdit(productToEdit);
    }

    return (
        <div className="overflow-x-auto">
            <table className="border-gray-600 border-collapse text-center shadow-lg w-full">
                <thead className="bg-gray-600 text-white sticky top-0">
                    <tr>
                        <th className="p-2">Product Name</th>
                        <th className="p-2">Catalogue</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="border p-2">{product.name}</td>
                            <td className="border p-2"><img src={product.image} alt="Product Catalogue" className="w-32 h-32 object-contain mx-auto" /></td>
                            <td className="border p-2">{formatCurrency(product.price)}</td>
                            <td className="border p-2">
                                <div>
                                    <button className="p-2 w-8 h-8 rounded-lg bg-yellow-400 me-1"
                                        onClick={() => handleOpenEditModal(product.id)}>
                                        <span className="material-symbols-outlined text-sm font-bold">
                                            edit_square
                                        </span>
                                    </button>
                                    <button className="p-2 w-8 h-8 rounded-lg bg-red-500 text-white"
                                        onClick={() => onDelete(product.id)}>
                                        <span className="material-symbols-outlined text-sm font-bold">
                                            delete
                                        </span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default TableProduct;
