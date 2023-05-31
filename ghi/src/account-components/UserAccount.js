import { useState, useEffect } from "react";

import AccountOrderHistory from "./AccountOrderHistory";
import ShopSalesList from "./ShopSalesList";
import OpenShop from "./OpenShop";

import Spinner from "../utilities/Spinner";

export default function UserAccount({ user, ids, shop, token, listings }) {
  const [view, setView] = useState(false);
  const [userPic, setUserPic] = useState(null);
  const [orders, setOrders] = useState(null);
  const [shopListings, setShopListings] = useState(null);
  const [history, setHistory] = useState(null);

  const handleSelection = (bool) => {
    setView(bool);
  };

  const getShopOrders = async (id) => {
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

  const getShopListings = (id) => {
    const shopList = listings.filter((listing) => id === listing.shop_id);
    setShopListings(shopList);
  };

  const getHistory = async () => {
    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/orders`;
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
      setHistory(data);
    }
  };

  useEffect(() => {
    getHistory();
  }, [token]);

  useEffect(() => {
    if (ids?.shop_id) {
      // getShopOrders(ids.shop_id);
      getShopListings(ids.shop_id);
    }
  }, [ids, listings]);

  if (!ids) {
    return <Spinner />;
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
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-20 h-20 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          )}

          <p className="mb-1 text-2xl font-semibold text-gray-500">
            {user.username}
          </p>
          <p className="mb-1 text-xl font-medium text-gray-500">{user.email}</p>

          <div className="flex mt-4 space-x-3">
            {shop ? (
              <button
                onClick={() => handleSelection(true)}
                className={
                  view
                    ? "w-24 px-2 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 ring-2 ring-green-400"
                    : "w-24 px-2 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800"
                }
              >
                My Shop
              </button>
            ) : (
              <OpenShop />
            )}
            <button
              onClick={() => handleSelection(false)}
              href="#"
              className={
                view
                  ? "w-24 px-2 py-2 text-sm font-medium text-center text-white bg-gray-500 border rounded-lg hover:bg-slate-600 "
                  : "w-24 px-2 py-2 text-sm font-medium text-center text-white bg-gray-500 border rounded-lg hover:bg-slate-600 ring-2 ring-gray-400"
              }
            >
              Purchased
            </button>
          </div>
        </div>
        {view ? (
          <ShopSalesList
            shop={shop}
            shopListings={shopListings}
            orders={orders}
            token={token}
            ids={ids}
          />
        ) : (
          <AccountOrderHistory history={history} token={token} />
        )}
      </div>
    </>
  );
}
