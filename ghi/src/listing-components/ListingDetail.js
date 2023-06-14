import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Reviews from "../reviews/reviews";
import AddToCart from "../cart-folder/AddToCart";

export default function ListingDetail({
  token,
  setCartListings,
  cartListings,
}) {
  const [detail, setDetail] = useState("");
  const [shop, setShop] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const navigateToStorePage = (event, shopId) => {
    event.preventDefault();
    navigate(`/shops/${shopId}`);
  };

  const getCombinedData = async () => {
    try {
      const detailUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/listings/${id}`;
      const detailResponse = await fetch(detailUrl);
      const data = await detailResponse.json();
      setDetail(data);

      if (detailResponse.ok) {
        const shop_id = data.shop_id;

        const shopUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/shops/${shop_id}`;
        const shopResponse = await fetch(shopUrl);
        const shopData = await shopResponse.json();
        setShop(shopData);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getCombinedData();
    // eslint-disable-next-line
  }, []);

  function formatToCurrency(amount) {
    return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }

  return (
    // left side of page from top to bottom

    <div>
      <section className="py-20 font-poppins">
        <div className="mx-auto w-screen px-24">
          <div className="flex flex-wrap mb-24 -mx-4">
            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
              <div className="sticky top-0overflow-hidden ">
                <div className="flex flex-col items-center relative mb-6 lg:mb-10 ">
                  <button
                    className="absolute left-0 transform lg:ml-2 top-1/2 translate-1/2"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="w-5 h-5 text-blue-500 bi bi-chevron-left dark:text-blue-200"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                      ></path>
                    </svg>
                  </button>
                  <img
                    className="object-cover w-96 h-96 rounded-xl"
                    src={detail.picture}
                    alt=""
                  />
                  <button
                    className="absolute right-0 transform lg:mr-2 top-1/2 translate-1/2"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="w-5 h-5 text-blue-500 bi bi-chevron-right dark:text-blue-200"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="flex-wrap hidden -mx-2 md:flex">
                </div>
                <div className="px-6 pb-6 mt-6 border-t border-gray-300 dark:border-gray-400 ">
                  <div className="items-center justify-center mt-6">
                    <Reviews listing_id={detail.id} token={token} />
                  </div>
                </div>
              </div>
            </div>
            {/* right side of page from top to bottom */}
            <div className="w-full px-4 md:w-1/2">
              <div className="lg:pl-20">
                <div className="mb-6 ">
                  <h2 className="max-w-xl mt-2 mb-4 text-5xl font-bold md:text-6xl font-heading dark:text-slate-900">
                    {detail.name}
                  </h2>
                  <p className="max-w-md mb-4 text-gray-500 dark:text-gray-500">
                    {detail && formatToCurrency(detail.price)}
                  </p>
                  <p className="max-w-md mb-4 text-gray-500 dark:text-gray-500">
                    {detail.description}
                  </p>
                  <button
                    onClick={(event) =>
                      navigateToStorePage(event, detail.shop_id)
                    }
                    href="#"
                    className="text-green-600 hover:underline dark:text-gray-400"
                  >
                    {shop && shop.name}
                  </button>
                  <div>
                    <span className="text-green-800 datext-green-200">
                      {detail.new ? "New" : "Used"}
                    </span>
                  </div>
                </div>
                <div className="mt-6 "></div>

                <div className="mt-6 ">
                  {(detail.quantity === 0) ?
                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:text-green-700 border border-green-700">SOLD OUT</span>
                    :
                    <AddToCart
                      detail={detail}
                      listing_id={id}
                      cartListings={cartListings}
                      setCartListings={setCartListings}
                    />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
