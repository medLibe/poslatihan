import React, { useEffect, useState } from "react";
import Header from "../layouts/Header";
import axios from "axios";

const CartPage = () => {
    const [cartData, setCartData] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    // count cart from local storage
    useEffect(() => {
        fetchCartData();
        const storedCartCount = localStorage.getItem('cartCount');
        if (storedCartCount) {
            setCartCount(parseInt(storedCartCount, 10));
        }
    }, []);

    const fetchCartData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/cart');
            if (response.status === 200) {
                setCartData(response.data.data);
            } else {
                console.error('Failed to fetch cart data');
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };

    const formatCurrency = (amount) => {
        let formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        });

        return formatter.format(amount);
    }

    return (
        <>
            <Header
                cartCount={cartCount} />
            <main className="p-8">
                <h1 className="text-3xl mt-4 mb-3">My Cart</h1>

                {cartData.map((product, index) => (
                    <div key={index} className="my-8 bg-white border-[1px] border-slate-300 rounded shadow-lg p-4">
                        <div className="flex">
                            <img src={product.image} alt="Cart Product" className="w-28 h-28" />
                            <div className="ms-4">
                                <h1 className="text-lg">{product.name}</h1>
                                <div className="text-sky-800 font-semibold">  {formatCurrency(product.price)}</div>
                                <div>Total Qty: <span>{product.totalQty}</span> pcs</div>
                            </div>
                        </div>
                    </div>
                ))}
            </main>
        </>
    )
};

export default CartPage;