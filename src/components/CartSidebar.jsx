/* eslint-disable react/prop-types */
import { CgClose } from 'react-icons/cg';
import { useGlobalContext } from '../context/context';
import { Link } from 'react-router-dom';
import { BsStarFill, BsStar, BsPlus, BsDashLg } from 'react-icons/bs';

const CartSidebar = () => {
    const { setIsCartOpen, cart, setCart } = useGlobalContext();         

    const removeItem = (item) => {
        let updatedCart = cart.filter((prod) => prod.id !== item.id);
        setCart(updatedCart);
    }  
    
    const addQty = (product) => {
       const productIndex = cart.findIndex((item) => item.id === product.id);
       if (productIndex !== -1) {
        const updatedCart = cart.map((item, index) => 
        index === productIndex ? { ...item, quantity: item.quantity + 1 } : item);
        setCart(updatedCart);
       }
    }

    const subQty = (product) => {
        const productIndex = cart.findIndex((item) => item.id === product.id);
        
        if (productIndex !== -1) {
            const currQnty = cart[productIndex].quantity;
            
            if (currQnty > 1) {
                const updatedCart = cart.map((item, index) => 
                index === productIndex && item.quantity > 1 ?
                { ...item, quantity: item.quantity - 1} : item);
                setCart(updatedCart);
            } else {
                const updatedCart = cart.filter((item, index) => index !== productIndex);
                setCart(updatedCart);
            }           
        } 
    }; 

    const cartTotal = cart.reduce((total, item) => (total + item.price * item.quantity), 0);
    const total = parseFloat(cartTotal.toFixed(2));
  return (
    <div className='w-full bg-[#0000009b] fixed top-0 right-0 h-screen'>
        <div className="fixed top-0 right-0 lg:w-1/3 w-5/6 md:w-1/2 h-screen overflow-y-auto bg-white lg:px-6 md:px-7 px-2">
            <div className="flex justify-between items-center py-5">
                <p className='font-semibold'>Cart Review</p>
                <CgClose role='button' className='text-xl text-gray-600 hover:text-gray-500'
                  onClick={() => setIsCartOpen(false)}                  
                />
            </div>
           {
            cart.length === 0 ? (
                <div className='flex justify-center h-80 items-center'>
                    <div className=''>
                        <p>Your cart is empty</p>  
                    </div>              
                </div>
            ) : (
                <div className="mt-10">
                <ul className="m-0 divide-y divide-gray-200">
                    {cart.length > 0 &&
                        cart.map((product) => {
                            let {id, title, price, description, category, image, rating} = product;
                            const maxLength = 58;
                            if (description.length > maxLength) {
                                description = description.slice(0, maxLength) + '...';
                            }
                            return (
                                <li key={product.id} className="lg:flex py-4 mb-5">
                                    <div className="lg:h-24 lg:w-24 w-4/6 h-4/6 flex-shrink-0 overflow-hidden rounded-md">
                                        <img src={image} alt={description}
                                          className="h-full w-full object-scale-down"
                                        />
                                    </div> 
                                    <div className="lg:ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>{title}</h3>
                                                <p className="ml-4">${price}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{description}</p>
                                        </div>
                                        <div className='flex justify-between mt-3'>
                                            <p>{category}</p>
                                            <div>
                                                <p>Rating: {rating.rate}</p>
                                                <p className="flex mt-2">
                                                    {[...Array(Math.round(rating.rate))].map((e, i) => (
                                                        <BsStarFill key={i} className="text-yellow-600" />
                                                    ))}
                                                    {[...Array(5 - Math.round(rating.rate))].map((e, i) => (
                                                        <BsStar key={i} className="text-yellow-600" />
                                                    ))}
                                                </p>    
                                            </div>
                                        </div>                               
                                        <div className="flex items-center gap-4 mt-3">
                                            <p>Quantity: </p>
                                            <div className='flex items-center lg:gap-6 gap-2'>
                                                <BsPlus className="text-3xl bg-slate-50 rounded-full" role="button"
                                                    onClick={() => addQty(product)}  
                                                />                                            
                                                <p>{product.quantity}</p>
                                                <BsDashLg className="text-3xl bg-slate-50 rounded-full" role="button"
                                                    onClick={() => subQty(product)}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mt-3">                                            
                                            <button
                                              onClick={() => removeItem(product)}
                                              className="py-2 px-3 rounded-md bg-red-600 text-white">
                                                Remove
                                            </button>
                                            <Link to={`/products/${id}`} className="text-blue-500">
                                                See Product
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                </ul>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${total}</p>
                </div>
            </div>
            </div> 
            )
           }           
        </div>
    </div>
  )
}

export default CartSidebar