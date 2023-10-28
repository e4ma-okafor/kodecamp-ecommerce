/* eslint-disable react/prop-types */
import React, { useState, useContext } from "react";

const productContext = React.createContext();

export const ProductContextProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cart, setCart] = useState([]);
    
    return (
        <productContext.Provider
            value={{ isCartOpen, setIsCartOpen, cart, setCart }}
        >
            {children}
        </productContext.Provider>
    )
};

export const useGlobalContext = () => {
    return useContext(productContext);
}