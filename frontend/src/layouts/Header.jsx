import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({ cartCount }) => {

    return (
        <header className="p-4 bg-sky-950 text-white">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="text-2xl tracking-widest font-bold">POS</div>
                    <ul className="ms-8 flex items-center space-x-8">
                        <li><NavLink to="/" className={({ isActive }) => isActive ? 'font-bold border-b-[1px] border-white' : 'hover:border-b-[1px] hover:border-white'}>Home</NavLink></li>
                        <li><NavLink to="/product" className={({ isActive }) => isActive ? 'font-bold border-b-[1px] border-white' : 'hover:border-b-[1px] hover:border-white'}>Product</NavLink></li>
                    </ul>
                </div>

                <div className="relative">
                    <NavLink to="/cart">
                        <span className="material-symbols-outlined text-3xl">
                            shopping_cart
                        </span>
                        <span className="absolute bg-red-500 text-xs p-1 w-5 h-5 rounded-full top-0 -right-1 flex items-center justify-center">{cartCount}</span>
                    </NavLink>
                </div>
            </div>
        </header>
    );
};

export default Header;