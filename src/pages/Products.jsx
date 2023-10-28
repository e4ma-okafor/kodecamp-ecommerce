import axios from "../api/axios";
import ReactLoading from 'react-loading';
import { useEffect, useState } from "react";
import { BsStarFill, BsStar } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import ProductHeader from "../components/ProductHeader";
import CartSidebar from "../components/CartSidebar";
import { useGlobalContext } from "../context/context";

const Products = () => {
    const {isCartOpen, setIsCartOpen, cart, setCart} = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);    
    //const [cart, setCart] = useState([]);
    //const [isCartOpen, setIsCartOpen] = useState(false);    

    const getProducts = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/products');
            console.log(response);
            if (response.status === 200) {
                setProducts(response.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addItem = (item) => {
        console.log('item', item);
        let isINCart = cart.some((prod) => prod.id === item.id);
        if (!isINCart) {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };  

    useEffect(() => {
        getProducts();
    }, []);
  return (
    <div className="min-h-screen">
        {isLoading ? (
            <div className="min-h-screen flex justify-center items-center">
                <div>
                    <ReactLoading type="spin" color="#0066ff"
                        height={100} width={50} 
                    />
                </div>
            </div>
        ) : (
            <section>
                <ProductHeader setIsCartOpen={setIsCartOpen} />
                {/*<p>Items in cart: {cart.length}</p>*/}                                
                <div className="w-11/12 mx-auto">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-10">
                    {products.length > 0 &&
                        products.map((product) => {
                            let {id, title, price, description, category, image, rating} = product;
                            const maxLength = 58;
                            if (description.length > maxLength) {
                                description = description.slice(0, maxLength) + '...';
                            }
                            return (
                                <div key={id}
                                  className="border drop-shadow-lg rounded-md p-4 bg-white">
                                    <img src={image} alt={description}
                                     className="h-40 w-full object-scale-down"/>
                                    <div>
                                        <h3 className="font-bold mb-2">{title}</h3>
                                        <p>{description}</p>
                                        <p className="font-medium mt-2">Category: <span className="font-normal">{category}</span></p>
                                        <p className="font-medium">Price: <span className="font-normal">${price}</span></p>
                                        <p className="font-medium">Rating: <span className="font-normal">{rating.rate}</span></p>
                                        <p className="flex">
                                            {[...Array(Math.round(rating.rate))].map((e, i) => (
                                                <BsStarFill key={i} className="text-yellow-600" />
                                            ))}
                                            {[...Array(5 - Math.round(rating.rate))].map((e, i) => (
                                                <BsStar key={i} className="text-yellow-600" />
                                            ))}
                                        </p>
                                        <div className="flex justify-between items-center my-6">
                                            <button
                                              onClick={() => addItem(product)}
                                              className="lg:py-2 lg:px-5 p-2 rounded-md bg-blue-600 text-white">
                                                Add to cart
                                            </button>
                                            <Link to={`/products/${id}`} className="text-blue-500">
                                                See Product
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                </div>
            </section>
        )}
        {isCartOpen && <CartSidebar setIsCartOpen={setIsCartOpen} />}
    </div>
  );
};

export default Products;
