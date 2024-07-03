import React, { useEffect, useState } from "react";
import Header from "../layouts/Header";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        getProducts();
        const storedCartCount = localStorage.getItem('cartCount');
        if(storedCartCount){
            setCartCount(parseInt(storedCartCount, 10));
        }
    }, []);

    // fetch all product
    const getProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products');
            const data = await response.json();
            setProducts(data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
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

    // add to cart 
    const addToCart = async (product) => {
        try {
            const response = await fetch('http://localhost:5000/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    qty: 1
                }),
            });

            if(response.ok){
                await response.json();

                setCartCount(prevCount => {
                    const newCount = prevCount + 1;
                    localStorage.setItem('cartCount', newCount.toString());
                    return newCount;
                });
            }
        }catch(error){
            console.error('Error adding product to cart: ', error);
        }
    }

    return (
        <>
            <Header 
            cartCount={cartCount}/>
            <main className="p-8">
                <h1 className="text-3xl mt-4 mb-3">Our Products</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {products.map((product) => (
                        <div key={product.id} className="border-[1px] border-gray-300 p-5 rounded-xl shadow-lg w-full sm:w-56 md:w-56 lg:w-64 xl:w-full">
                            <img src={product.image} alt={product.name} />
                            <div className="text-sm text-blue-800 mt-3">{product.name}</div>
                            <div className="font-semibold text-sm">
                                {formatCurrency(product.price)}
                            </div>
                            <div className="flex items-center mt-3 justify-end">
                                <button className="bg-blue-800 text-white py-1 px-2 rounded text-sm" onClick={() => addToCart(product)}>
                                    <span className="material-symbols-outlined text-sm">
                                        shopping_cart
                                    </span>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}

export default HomePage;