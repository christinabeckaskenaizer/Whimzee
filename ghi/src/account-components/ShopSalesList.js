import { useState } from "react";

export default function ShopSalesList({ orders }) {
  let netTotal = 0;
  if (!orders) {
    return;
  }

  return (
    <>
      <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-center text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Buyer
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Shipped
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Unit Price
              </th>
              <th scope="col" className="px-6 py-3">
                Total Sold
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {orders.map((order) => {
              netTotal += order.quantity * order.price;
              return (
                <tr
                  key={order.id}
                  className="text-gray-600 bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    {order.buyer_first_name} {order.buyer_last_name}
                  </td>
                  <td className="px-6 py-4">{order.address}</td>
                  <td className="px-6 py-4">{order.status.toString()}</td>
                  <td className="px-6 py-4">{order.quantity}</td>
                  <td className="px-6 py-4">{order.price.toFixed(2)}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-wrap"
                  >
                    ${order.quantity * order.price}
                  </th>
                </tr>
              );
            })}
            <tr className="text-gray-600 bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">Total</td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-wrap"
              >
                ${netTotal.toFixed(2)}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
