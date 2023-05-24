import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import AccountOrderHistory from "./AccountOrderHistory";
import ShopSalesList from "./ShopSalesList";

import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "../custom-hooks/useUser";
import useShop from "../custom-hooks/useShop";
import useCart from "../custom-hooks/useCart";

export default function UserAccount({}) {
  const { token } = useToken();
  const { user, ids } = useUser(token);
  const { shop } = useShop(ids);
  const { cart } = useCart(ids);
  console.log(user);
  const [view, setView] = useState(false);
  // const [userPic, setUserPic] = useState(
  //   "https://s.yimg.com/ny/api/res/1.2/Gp3tIUKkvSV6HUF_d6yfsw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM1Mg--/https://media.zenfs.com/en-US/smartasset_475/47624d7cbd95041c5c0f9fb287e8d337"
  // );
  const [userPic, setUserPic] = useState(null);

  const handleSelection = (bool) => {
    setView(bool);
  };

  if (!ids) {
    // add spinner here
    return <h1>Loading</h1>;
  }

  return (
    <>
      <div className="flex flex-col items-center p-10">
        <div className="flex flex-col items-center pb-10 mt-10">
          {userPic ? (
            <img
              className="p-3 object-cover rounded-full h-32 w-32"
              src={userPic}
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-32 h-32 text-slate-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}

          <h5 className="mb-1 text-2xl font-medium text-slate-500">User</h5>
          <div className="flex mt-4 space-x-3">
            {shop ? (
              <button
                onClick={() => handleSelection(true)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-emerald-500 rounded-lg hover:bg-emerald-400"
              >
                View Shop
              </button>
            ) : (
              <NavLink
                to={"shop"}
                onClick={() => handleSelection(true)}
                className="inline-flex items-center px-4 py-2 text-sm
                font-medium text-center text-white bg-emerald-500 rounded-lg
                hover:bg-emerald-400"
              >
                Open Shop
              </NavLink>
            )}
            <button
              onClick={() => handleSelection(false)}
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center  text-white bg-slate-400 border border-slate-200 rounded-lg hover:bg-slate-300 "
            >
              Purchased
            </button>
          </div>
        </div>
        {view ? <ShopSalesList /> : <AccountOrderHistory />}
      </div>
    </>
  );
}
