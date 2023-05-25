import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { NavLink } from 'react-router-dom';


const SignUpForm = ({}) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { token } = useToken();
  const { login } = useToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
    e.target.reset();

  };
  useEffect(() => {
    console.log(token)
    if (token) {
      navigate("/")
    }
  }, [token])

  return (
<>
<form className="flex flex-col items-center px-4 py-5 my-5" onSubmit={(e) => handleSubmit(e)}>
  <div className="text-center">
    <h1>Welcome to Whimzee</h1>
</div>
  <div className="mb-6">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 text-black">Email:</label>
    <input
    type="text"
    id="email"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
    placeholder="john@yahoo.com"
    required
    onChange={(e) => setEmail(e.target.value)}
    ></input>
  </div>
  <div className="mb-6">
    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 text-black">Username:</label>
    <input
    type="text"
    id="username"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
    placeholder="A unique username"
    required
    onChange={(e) => setUsername(e.target.value)}
    ></input>
  </div>
  <div className="mb-6">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 text-black">Password:</label>
    <input
    type="password"
    id="password"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
    placeholder="Password"
    required
    onChange={(e) => setPassword(e.target.value)}
    ></input>
  </div>
  <button type="submit" className="text-white dark:bg-gray-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-large rounded-lg text-sm w-full sm:w-auto px-5 py-2.5">Submit</button>
            <NavLink to="/login" className="block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-5 md:dark:text-black md:hover:text-green-800" aria-current="page">
          Already have an account? Click here to Log in
          </NavLink>
</form>
</>
  );
};

export default SignUpForm;
