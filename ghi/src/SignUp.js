import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { NavLink } from "react-router-dom";
import Error from "./reviews/Error";

const SignupError = ({ auth }) => {
  if (!auth) {
    return (
      <div className="text-center">
        <h1>Welcome to Whimzee</h1>
      </div>
    );
  } else {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <span className="block sm:inline">
          Username or Email already taken. Please try again
        </span>
        <span className="block sm:inline"></span>
      </div>
    );
  }
};

const SignUpForm = ({ ids }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { token } = useToken();
  const { login } = useToken();
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState(false)

  const createCart = async () => {
    const cartUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/cart`;
    let cartData = {
      user_id: ids.id,
    };
    try {
      await fetch(cartUrl, {
        method: "POST",
        body: JSON.stringify(cartData),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = process.env.REACT_APP_SAMPLE_SERVICE_API_HOST;
    const response = await fetch(`${url}/users/${email}`);
    const responseData = await response.json();
    if (responseData === false) {
      const data = {};
      data.email = email;
      data.username = username;
      data.password = password;
      const config = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const createUser = await fetch(`${url}/api/accounts`, config);
      if (createUser.ok) {
        login(email, password);
      } else {
        setError(true)
      }
    } else {
      setAuth(true);
      e.target.reset();
    }
  };

  useEffect(() => {
    if (token) {
      createCart();
      navigate("/");
    }
    // eslint-disable-next-line
  }, [ids]);

  return (
    <>
      <form
        className="flex flex-col items-center px-4 py-5 my-5"
        onSubmit={(e) => handleSubmit(e)}
      >
        <SignupError auth={auth} />
        <Error error={error} />
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 text-black"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
            placeholder="john@yahoo.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 text-black"
          >
            Username:
          </label>
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
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 text-black"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button
          type="submit"
          className="text-white dark:bg-gray-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-large rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
        >
          Submit
        </button>
        <NavLink
          to="/login"
          className="block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-5 md:dark:text-black md:hover:text-green-800"
          aria-current="page"
        >
          Already have an account? Click here to Log in
        </NavLink>
      </form>
    </>
  );
};

export default SignUpForm;
