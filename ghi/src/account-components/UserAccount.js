import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import AccountOrderHistory from "./AccountOrderHistory";
import ShopSalesList from "./ShopSalesList";
import OpenShop from "./OpenShop";

import Spinner from "../utilities/Spinner";
import ReturnToHome from "../utilities/ReturnToHome";

export default function UserAccount({
  user,
  ids,
  shop,
  token,
  listings,
  fetchData,
}) {
  const navigate = useNavigate();
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
    if (token) {
      getHistory();
    }
  }, [token]);

  useEffect(() => {
    if (ids?.shop_id) {
      // getShopOrders(ids.shop_id);
      getShopListings(ids.shop_id);
    }
  }, [ids, listings]);

  if (!ids) {
    return <ReturnToHome />;
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
            <img
              className="p-3 object-cover rounded-full h-40 w-40"
              src="https://media.istockphoto.com/id/1097490360/vector/vector-illustration-of-cute-black-cat.jpg?s=612x612&w=0&k=20&c=Ef0qYl79aZJ6NJXJVbJ0onjXVNnSyqrN_TKPjieAIGE="
            />
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
                    ? "rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 focus:outline-none ring-2 ring-gray-400"
                    : "rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 focus:outline-none"
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
                  ? "w-24 px-2 py-2 text-sm font-medium text-center text-white bg-gray-500 border rounded-lg hover:bg-slate-600 hover:ring-2 hover:ring-gray-400"
                  : "w-24 px-2 py-2 text-sm font-medium text-center text-white bg-green-700 border rounded-lg hover:bg-slate-600 ring-2 ring-gray-400"
              }
            >
              Purchased
            </button>
          </div>
        </div>
        {view ? (
          <ShopSalesList
            fetchData={fetchData}
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
