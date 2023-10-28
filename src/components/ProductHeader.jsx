/* eslint-disable react/prop-types */
import { FaCartArrowDown } from 'react-icons/fa'
import { useGlobalContext } from '../context/context'

const ProductsHeader = () => {
    const { setIsCartOpen, cart } = useGlobalContext();
  return (
    <div>
        <div className="bg-white py-4 px-1 lg:px-0 shadow-md shadow-gray-500/30">
            <div className="w-11/12 mx-auto">
                <div className="flex justify-between items-center">
                    <p className='text-blue-500 font-semibold lg:text-3xl text-lg'>Kodecamp Ecommerce</p>
                    <div className='relative'>
                        <FaCartArrowDown className='text-3xl' role='button'
                          onClick={() => setIsCartOpen(true)}
                        />
                        <div className='p-1 text-xs rounded-full bg-red-400 text-white absolute -top-3 -right-3'>
                            {cart.length}
                        </div>                        
                    </div>
                </div>
            </div>            
        </div>    
    </div>
  )
}

export default ProductsHeader