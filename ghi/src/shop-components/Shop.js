import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ListingCard from "../ListingCard";

export default function Shop({ shop_id }) {
  const [shop, setShop] = useState(null);
  const [listings, setListings] = useState(null);

  const id = useParams();
  console.log("id", id)
  console.log("shop_id", shop_id)
  const sampleImg =
    "https://i.ebayimg.com/images/g/dpUAAOSwwz1kP2K0/s-l1600.jpg";

  const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}`;
  const getShopData = async () => {
    const response = await fetch(`${url}/shops/${shop_id}`);
    if (response.ok) {
      const shopData = await response.json();
      setShop(shopData);
      console.log("shop data", shop)
    }
  };
  const getShopListings = async () => {
    const response = await fetch(`${url}/listings`);
    if (response.ok) {
      const listingData = await response.json();
      console.log(listingData);
      const shopListings = listingData.filter(
        (listing) => listing.shop_id === shop_id
      );
      setListings(shopListings);
    }
  };

  useEffect(() => {
    getShopData();
    getShopListings();
  }, []);

  if (!shop) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <div className="w-full ">
        <section
          style={{ backgroundImage: `url(${sampleImg})` }}
          className="mb-4 flex justify-center w-full items-end h-[20rem] bg-center bg-no-repeat bg-gray-700 bg-blend-multiply"
        >
          <div className=" flex justify-start flex-col px-4 w-5/6">
            <h1 className="w-full mb-2 mt-10 p-4 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
              {shop.name}
            </h1>
            <div className="flex justify-between content-center mb-2">
              <p className="p-4 text-xl font-normal text-gray-300 lg:text-xl">
                {shop.description}
              </p>
              {/* This is the link to chat */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="cursor-pointer flex w-8 rounded-full text-gray-300 hover:text-green-700"
              >
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
            </div>
          </div>
        </section>
        <div className="m-auto p-4 flex justify-center flex-col px-4 w-5/6">
          {listings && (
            <div className="grid items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
              {listings.map((listing) => (
                <div key={listing.id} className="col-span-1">
                  <ListingCard
                    picture={listing.picture}
                    name={listing.name}
                    isNew={listing.new}
                    price={listing.price}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
