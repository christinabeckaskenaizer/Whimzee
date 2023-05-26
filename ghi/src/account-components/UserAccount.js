import { useState, useEffect } from "react";

import AccountOrderHistory from "./AccountOrderHistory";
import ShopSalesList from "./ShopSalesList";
import OpenShop from "./OpenShop";

export default function UserAccount({ user, ids, shop, token }) {
  const [view, setView] = useState(true);
  const [userPic, setUserPic] = useState(null);
  const [orders, setOrders] = useState(null);

  const handleSelection = (bool) => {
    setView(bool);
  };

  const getShopOrders = async (id) => {
    console.log("now I will get the orders");
    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/${id}/orders`;
    const config = {
      credentials: "include",
      method: "get",
      headers: {
        headers: { Authorization: `Bearer ${token}` },
      },
    };
    const response = await fetch(url, config);
    if (response.ok) {
      const data = await response.json();
      setOrders(data);
    }
  };

  useEffect(() => {
    if (ids?.shop_id) {
      getShopOrders(ids.shop_id);
    }
  }, [ids]);

  if (!ids) {
    // add spinner here
    return <h1>Loading</h1>;
  }

  return (
    <>
      <div className="flex w-full flex-col items-center p-10">
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
              <OpenShop />
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
        {view ? <ShopSalesList orders={orders} /> : <AccountOrderHistory />}
      </div>
    </>
  );
}
