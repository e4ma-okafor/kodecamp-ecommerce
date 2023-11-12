import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const Signup = () => {
  const Navigate = useNavigate()
  
  const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required').min(8),
    lastname: yup.string().required('lastName is required'),
    firstName: yup.string().required('firstName is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onsubmit = (data) => {
    localStorage.setItem("register", JSON.stringify(data))
    Navigate("/")
  };

  return (    
    <div>
      <div className="flex min-h-screen">
        <div className="md:w-2/5 md:block hidden p-10 w-2/5 bg-no-repeat bg-cover bg-center bg-reg-pattern">
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
          <h3 className="text-3xl mb-4 font-extrabold">Register</h3>   
          <form action="" onSubmit={handleSubmit(onsubmit)}>
            <div className="flex gap-4">
              <div className="mb-6 w-full">
                <label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900">Your FirstName</label>
                <input type="text" id="fname"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                  placeholder="john" required 
                  {...register('firstName')}                  
                />
                <p className='text-red-500'>{errors.firstName?.message}</p>
              </div>
              <div className="mb-6 w-full">
                <label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900">Your LastName</label>
                <input type="text" id="lname"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                  placeholder="doe" required  
                  {...register('lastname')}                 
                />
                <p className='text-red-500'>{errors.lastname?.message}</p>
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
              <input type="email" id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                placeholder="name@flowbite.com" required="" 
                {...register('email')}
              />
              <p className='text-red-500'>{errors.email?.message}</p>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
              <input type="password" id="password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required="" 
                {...register('password')}
              />
              <p className='text-red-500'>{errors.password?.message}</p>
            </div>
            <div className="mb-6">
              <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900">Repeat password</label>
              <input type="password" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required="" 
              {...register('confirmPassword')}
            />
            </div>
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input id="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" value="" />
              </div>
              <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900">I agree with the <Link to="/signup" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</Link></label>
            </div>
            <button type="submit" onClick={handleSubmit(onsubmit)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center">
              Create Account 
            </button>
            <p className="mt-3 text-sm font-medium text-gray-900"> Already have an account? <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-500">Login</Link> instead </p>
          </form>      
        </div>
        </div>
      </div>                   
    </div>   
  )
}

export default Signup