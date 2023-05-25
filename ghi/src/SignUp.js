import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";

const SignUpForm = ({}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
    e.target.reset();
  };

  return (
<>
<div className="text-center">
    <h1>Welcome to Whimzee</h1>
</div>
<form className="flex flex-col items-center" onSubmit={(e) => handleSubmit(e)}>
  <div className="mb-6">
    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 text-black">Username</label>
    <input
    type="text"
    id="username"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
    placeholder="Your username"
    required
    onChange={(e) => setUsername(e.target.value)}
    ></input>
  </div>
  <div className="mb-6">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 text-black">Password</label>
    <input
    type="password"
    id="password"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
    placeholder="Password"
    required
    onChange={(e) => setPassword(e.target.value)}
    ></input>
  </div>
  <button type="submit" className="text-white dark:bg-gray-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5">Submit</button>
</form>
</>
  );
};

export default SignUpForm;
