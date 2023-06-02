import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../custom-hooks/useUser";

export default function DeleteListing({
  listing,
  shopListings,
  handleClick,
  open,
}) {
  let [isOpen, setIsOpen] = useState(open);
  const [listings, setListings] = useState(shopListings);

  const navigate = useNavigate();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // async function deleteListing() {
  //     const listingUrl = `http://localhost:8000/listings/${listing.id}`

  //     await fetch(listingUrl,
  //         { method: 'DELETE' });
  //     closeModal();
  // }

  // useEffect(() => {
  //     setListings(shopListings)
  // }, [shopListings]);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Delete
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete Listing
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you wish to proceed?
                    </p>
                  </div>

                  <div className="p-2 flex">
                    <div className="w-1/2"></div>
                    <div className="w-1/2">
                      <button
                        onClick={handleClick}
                        className="m-1 inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Delete
                      </button>
                      <button
                        onClick={closeModal}
                        className="m-1 inline-flex justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
