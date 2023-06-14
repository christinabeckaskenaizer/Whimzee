import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import PaySuccess from "./success";
import ReturnToHome from "../utilities/ReturnToHome";

export default function Checkout({
  token,
  user,
  cartListings,
  setCartListings,
}
) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [purchased, setPurchased] = useState(false);
  const [checkoutList, setCheckoutList] = useState([]);
  const url = process.env.REACT_APP_SAMPLE_SERVICE_API_HOST;


  const createNewOrder = async (currentListing) => {
    const data = {
      shop_id: currentListing.listing.shop_id,
      buyer_first_name: user.username,
      buyer_last_name: user.username,
      quantity: currentListing.num_in_cart,
      listing: currentListing.listing.id,
      address: "some address",
      price: currentListing.listing.price,
    };

    const config = {
      credentials: "include",
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        headers: { Authorization: `Bearer ${token}` },
      },
    };
    const response = await fetch(`${url}/orders`, config);
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      return null;
    }
  };
  const deleteCartListings = async (currentListing) => {
    const config = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(`${url}/cart_listings/${currentListing.id}`, config);
  };

  const editListings = async (currentListing) => {
    let data = {
      quantity: (currentListing.listing.quantity -= currentListing.num_in_cart),
      quantity_sold: (currentListing.listing.quantity_sold +=
        currentListing.num_in_cart),
    };
    const config = {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `${url}/listings/${currentListing.listing.id}/inventory`,
      config
    );
    if (response.ok) {
      deleteCartListings(currentListing);
    } else {
      console.log("Unable to update listings");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let i = 0; i < checkoutList.length; i++) {
      const currentListing = checkoutList[i];
      const listingResponse = await fetch(
        `${url}/listings/${currentListing.listing.id}`
      );
      if (listingResponse.ok) {
        const listingData = await listingResponse.json();
        currentListing.listing = listingData;
        if (currentListing.listing.quantity >= currentListing.num_in_cart) {
          const orderStatus = await createNewOrder(currentListing);
          if (orderStatus) {
            editListings(currentListing);
          } else {
            console.log("could not complete order creation");
          }
        } else {
          console.log("Not enough units in stock");
        }
      }
    }
    setCartListings([]);
    setPurchased(true);
    navigate("/checkout")
  };

  useEffect(() => {
    setCheckoutList(cartListings);
    // eslint-disable-next-line
  }, []);

  if (!user) {
    return <ReturnToHome />;
  };



    return (
        <>
      {purchased ? (
        <PaySuccess />
      ) : (
        <>
      <button
        onClick={() => setOpen(true)}
        className="bg-white hover:bg-gray-200 text-black font-sm
         hover:text-black py-2 px-2 border border-gray-400
        rounded-lg "
      >
        Checkout
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <Dialog.Title className="text-base text-center font-semibold leading-6 text-gray-900">
                      Payment
                    </Dialog.Title>
                    <form
                      className="flex flex-col items-center px-4 py-5 my-5 w-full"
                      onSubmit={(e) => handleSubmit(e)}
                    >
                      <div className="w-full mb-6">
                        <label
                          htmlFor="name"
                          className="block mb-2 m-auto text-sm font-large text-gray-900"
                        >
                          Name on Credit Card
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="w-full bg-gray-50 m-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                          placeholder="e.g. John Sunshine"
                        />
                      </div>
                      <div className="w-full mb-6">
                        <label
                          htmlFor="email"
                          className="block mb-2 m-auto text-sm font-large text-gray-900"
                        >
                          Credit Card Number
                        </label>
                        <input
                          type="number"
                          name="number"
                          id="number"
                          className="w-full bg-gray-50 m-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                          placeholder="XXXX-XXXX-XXXX-XXXX"
                        />
                      </div>
                      <div className="w-full mb-6">
                        <label
                          htmlFor="address"
                          className="block mb-2 m-auto text-sm font-large text-gray-900"
                        >
                          Address
                        </label>
                        <textarea
                          type="text"
                          name="address"
                          id="address"
                          placeholder="Your Address"
                          className="w-full bg-gray-50 m-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        />
                      </div>
                      <button
                        type="submit"
                        className="text-white dark:bg-gray-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-large rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
                      >
                        Pay
                      </button>
                    </form>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
    )}
    </>
    )}
