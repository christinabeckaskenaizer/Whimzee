import { useEffect, useState } from "react";
import CreateListing from "../listing-components/CreateListing";
import EditShop from "./EditShop";
import DeleteShop from "./DeleteShop";
import DeleteListing from "../listing-components/DeleteListing";
import { Link } from "react-router-dom";
import Spinner from "../utilities/Spinner";
import EditListing from "../listing-components/EditListing";


export default function ShopSalesList({ shopListings, shop, token, ids, fetchData }) {

  const [open, setOpen] = useState(false);
  const [listings, setListings] = useState(shopListings);

  useEffect(() => {
    setListings(shopListings)
  }, [shopListings])

  if (!shopListings || !ids || !shop) {
    return <Spinner />;
  }


  async function deleteListing(listing) {
    const listingUrl = `http://localhost:8000/listings/${listing.id}`

    let response = await fetch(listingUrl,
      { method: 'DELETE' });
    if (response.ok) {
      fetchData();
      // updateListings();
      // setListings(listings);
      console.log("listings post delete", listings);
      setOpen(false);
    }
  }

  // async function updateListings() {
  //   let shopId = shop.id
  //   const listingUrl = `http://localhost:8000/listings/`
  //   let response = await fetch(listingUrl, { method: "GET" });
  //   let data = await response.json();
  //   const filteredData = data.filter(
  //     (listing) => listing.shop_id === Number(shopId)
  //   );
  //   setListings(filteredData);
  //   setOpen(false);

  // }


  let netTotal = 0;
  console.log(shopListings, "shop list");

  return (
    <>
      <p className="text-center text-2xl font-medium text-gray-500">
        Active Listings
      </p>
      <div className="mb-2 flex justify-between w-full">
        <div>
          <CreateListing fetchData={fetchData} shopListings={shopListings} ids={ids} token={token} />
        </div>
        <div className="">
          <Link
            className="px-2.5 py-2.5 bg-gray-200 hover:bg-gray-300 text-black font-sm border border-gray-300 rounded-lg"
            to={`/shops/${shop.id}`}
          >
            View shop
          </Link>
          <EditShop shop={shop} token={token} ids={ids} />
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
            {listings.map((listing) => {
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
                    <EditListing fetchData={fetchData} shopListings={shopListings} ids={ids} token={token} />
                    <DeleteListing handleClick={() => deleteListing(listing)} shopListings={listings} listing={listing} open={open} />
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
      <div className="mt-2 flex justify-end w-full">
        <DeleteShop shop={shop} token={token} />
      </div>
    </>
  );
}
