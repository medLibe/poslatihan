import React from "react";

const ModalDeleteProduct = ({ productToDelete, onDelete, onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg relative">
                <h1 className="text-xl mb-4">Delete Product</h1>

                <button className="top-2 right-2 p-2 absolute" onClick={onClose}>
                    <span className="material-symbols-outlined text-xl font-bold">
                        close
                    </span>
                </button>

                <div className="mb-4">
                    <p className="mb-2">Are you sure you want to delete this product?</p>
                    <p className="font-bold">{productToDelete.name}</p>
                </div>

                <div className="flex items-center justify-end mt-5">
                    <button
                        onClick={onDelete}
                        className="bg-red-500 text-white py-2 px-3 rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalDeleteProduct;
