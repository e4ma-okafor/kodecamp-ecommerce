import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useState, useEffect } from "react";

const Login = () => {
  const Navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({})    
    const [errorMessage, setErrorMessage] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const userInput = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        if (
            userDetails &&
            userInput.email === userDetails.email &&
            userInput.password === userDetails.password
        ) {            
            Navigate("/");
        } else {            
            setErrorMessage('Invalid email or password');
        }
    };


    useEffect(() => {

        const user = localStorage.getItem("register")
        setUserDetails(JSON.parse(user))
    }, [])

  return (    
    <div>
      <div className="flex min-h-screen">
        <div className="md:w-2/5 md:block hidden p-10 w-2/5 bg-no-repeat bg-cover bg-center bg-login-pattern">
        <h4 className="font-bold text-white lg:text-[32px] text-2xl">
          Kodecamp Ecommerce
        </h4>
        </div>
        <div className="md:w-3/5 w-full flex justify-center items-center min-h-screen">
        <div className="md:w-2/3 w-11/12 py-4">
        <Link to="/">
            <div className="p-3 bg-slate-500 text-white rounded-full w-12 h-12 flex justify-center items-center cursor-pointer mb-10">
              <BsArrowLeft />
            </div>
          </Link> 
        <form action="" onSubmit={handleFormSubmit}>
          <h3 className="text-3xl mb-4 font-extrabold">Login</h3>
          <div className="mb-6">         
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>                              
            <input
              type="email" 
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Email Address"
              autoComplete="email"
              required
            />
          </div>
          <div className="mb-6"> 
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>                               
            <input
              type="password" 
              id="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="password"
              autoComplete="current-password"
              required
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}                            
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center"
          >
            Login
          </button>
        </form>  
        <div>
            <p className="mt-3 text-sm font-medium text-gray-900">Don&apos;t have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link> instead</p>    
        </div>
        </div>
        </div>
      </div>                   
    </div>   
  )
}

export default Login