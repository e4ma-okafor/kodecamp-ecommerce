import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "../api/axios";
import ReactLoading from 'react-loading';

const SingleProduct = () => {
  const items = useParams();  
  const [isLoading, setIsLoading] =  useState(false);
  const [product, setProduct] = useState({}); 

  const getProduct = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/products/${items.id}`);
      if (response.status === 200) {
        console.log(response);
        setProduct(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">           
      {
        isLoading ? (
          <div className="min-h-screen flex justify-center items-center">
                <div>
                    <ReactLoading type="spin" color="#0066ff"
                        height={100} width={50} 
                    />
                </div>
            </div>
        ) : (
          <div className="lg:w-3/5 w-11/12 mx-auto">
      {product && (
        <div className="lg:flex gap-10 rounded-md p-8 border drop-shadow-lg bg-white">
          <div className="lg:h-3/5 lg:w-3/5 w-3/5 md:w-6/12 mx-auto">
          <img src={product.image} alt={product.description}
            className="h-full w-full object-scale-down"
          />
          </div>
          <div className="mt-4 lg:mt-0">
            <p className="font-bold text-3xl mb-3">{product.title}</p>
            <p className="font-semibold text-xl mb-3">${product.price}</p>
            <p className="mb-3">{product.description}</p>
            <p className="mb-3">{product.category}</p>            
            <p className="font-medium">Rating: <span className="font-normal">{product?.rating?.rate}</span></p>
          </div>
        </div>
      )}
    </div>
        )
      }
    </div>
  );
};

export default SingleProduct