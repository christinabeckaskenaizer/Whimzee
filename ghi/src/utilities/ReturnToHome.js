import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Spinner from "./Spinner";

export default function ReturnToHome() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 2500);
  });

  return (
    <>
      {show ? (
        <div className="flex w-full flex-col items-center p-10">
          <img
            alt=""
            className="p-3 object-cover rounded-full h-60 w-60"
            src="https://img.freepik.com/premium-vector/cute-cat-character-with-paper-bag-mask-its-head-illustration_90661-395.jpg"
          />
          <p className="mb-1 text-2xl font-semibold text-gray-500">
            Can't find what you're looking for?
          </p>
          <div className="flex flex-col-2 items-center p-10">
            <NavLink
              to="/"
              className="mx-2 rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 focus:outline-none"
            >
              home
            </NavLink>
            <NavLink
              to="/login"
              className="mx-2 rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 focus:outline-none"
            >
              login
            </NavLink>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
