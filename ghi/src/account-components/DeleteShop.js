import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

export default function DeleteShop({ token, shop }) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/shops/${shop.id}`;
    const config = {
      credentials: "include",
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        headers: { Authorization: `Bearer ${token}` },
      },
    };
    const response = await fetch(url, config);
    if (response.ok) {
      navigate(0);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-gray-200 hover:bg-gray-300 text-black font-sm py-2 px-2 border border-gray-300 rounded-lg"
      >
        Delete shop
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
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <Dialog.Title className="text-center font-semibold text-lg text-gray-900">
                      Are you sure you want to delete this shop?
                    </Dialog.Title>
                    <form
                      className="flex flex-col items-center pt-4 w-full"
                      onSubmit={(e) => handleSubmit(e)}
                    >
                      <button
                        type="submit"
                        className="text-white bg-red-600 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-large rounded-lg text-md w-full sm:w-auto px-5 py-2.5"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                  <div className="text-md bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
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
  );
}
