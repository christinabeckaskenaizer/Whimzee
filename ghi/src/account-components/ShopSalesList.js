import { useState } from "react";
import CreateListing from "../listing-components/CreateListing";
import EditShop from "./EditShop";
import DeleteShop from "./DeleteShop";
import { Link } from "react-router-dom";

export default function ShopSalesList({
  shopListings,
  listings,
  shop,
  token,
  ids,
}) {
  if (!shopListings) {
    return;
  }
  let netTotal = 0;
  console.log(shopListings, "shop list");
  return (
    <>
      <div className="mb-2 flex justify-between w-full">
        <div>
          <CreateListing ids={ids} token={token} />
        </div>
        <div className="">
          <Link
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-400"
            to={`/shops/${shop.id}`}
          >
            View shop
          </Link>
          <EditShop shop={shop} token={token} ids={ids} />
          <DeleteShop shop={shop} token={token} />
        </div>
      </div>
      <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-center text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Listing
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Units Sold
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                Manage
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {shopListings.map((listing) => {
              netTotal += listing.quantity_sold * listing.price;
              console.log(netTotal, "nettotal");
              return (
                <tr
                  key={listing.id}
                  className="text-gray-600 bg-white blisting-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{listing.name}</td>
                  <td className="px-6 py-4">{listing.quantity}</td>
                  <td className="px-6 py-4">{listing.price}</td>
                  <td className="px-6 py-4">{listing.quantity_sold}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-wrap"
                  >
                    ${listing.quantity_sold * listing.price}
                  </th>
                  <td className="px-6 py-4 flex justify-between">
                    <button className="ring-1 p-1">edit</button>
                    <button className="ring-1 p-1">delete</button>
                  </td>
                </tr>
              );
            })}
            <tr className="text-gray-600 bg-white blisting-b hover:bg-gray-50">
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">Total</td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-wrap"
              >
                ${netTotal}
              </th>
              <td className="px-6 py-4"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
