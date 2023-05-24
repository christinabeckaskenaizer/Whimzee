import { useState } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import LoginForm from "../LoginForm";

export default function CreateShopForm() {
  const { token } = useToken();
  console.log(token);
  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");

  const handleChange = ({ target }, callBack) => {
    const { value } = target;
    callBack(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.name = shopName;
    data.email = email;
    data.description = description;
    data.profile_picture = picture;
    console.log(data);
    console.log(token);

    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/shops`;
    const config = {
      credentials: "include",
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        headers: { Authorization: `Bearer ${token}` },
      },
    };
    const response = await fetch(url, config);
    console.log(response);
    setShopName("");
    setEmail("");
    setDescription("");
    setPicture("");
  };

  return (
    <>
      name, profile_picture, email, description
      <LoginForm />
      <div className="flex flex-col items-center">
        <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6" action="#">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Create a new Shop
            </h5>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Shop Name
              </label>
              <input
                value={shopName}
                onChange={(event) => handleChange(event, setShopName)}
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Name of Shop"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Shop email
              </label>
              <input
                value={email}
                onChange={(event) => handleChange(event, setEmail)}
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Shop Description
              </label>
              <textarea
                value={description}
                onChange={(event) => handleChange(event, setDescription)}
                type="text"
                name="description"
                id="description"
                placeholder="Shop Description"
                className="h-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="picture"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Banner Picture
              </label>
              <input
                value={picture}
                onChange={(event) => handleChange(event, setPicture)}
                type="text"
                name="picture"
                id="picture"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="picture URL (optional)"
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create Shop
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
