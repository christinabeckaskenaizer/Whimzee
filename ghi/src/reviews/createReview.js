import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

function CreateReviewButton({ token, setOpen }) {
    if (token) {
        return (
        <button
        onClick={() => setOpen(true)}
        className="bg-white hover:bg-gray-200 text-black font-sm
         hover:text-black py-2 px-2 border border-gray-400
        rounded-lg "
      >
        Write a review
      </button>
        )
    }
}
export default function CreateReview({ listing_id, token }) {
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const handleChange = ({ target }, callBack) => {
    const { value } = target;
    callBack(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.rating = rating
    data.description = description

    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/${listing_id}/reviews`;
    const config = {
      credentials: "include",
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        headers: { Authorization: `Bearer ${token}` },
      },
    };
    const response = await fetch(url, config);
    if (response.ok) {
      setRating("");
      setDescription("");
      setOpen(false);
    }
  };

  return (
    <>
    <CreateReviewButton token={token} setOpen={setOpen}/>
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
                      Tell us how you like our product
                    </Dialog.Title>
                    <form
                      className="flex flex-col items-center px-4 py-5 my-5 w-full"
                      onSubmit={(e) => handleSubmit(e)}
                    >
                      <div className="w-full mb-6">
                        <label
                          htmlFor="rating"
                          className="block mb-2 m-auto text-sm font-large text-gray-900"
                        >
                          Rating
                        </label>
                                <select
                                onChange={(event) => handleChange(event, setRating)}
                                className="w-full bg-gray-50 m-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                                <option value={0}>Rating</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                        {/* <input
                          value={rating}
                          onChange={(event) => handleChange(event, setRating)}
                          type="number"
                          name="rating"
                          id="rating"
                          placeholder="1-5"
                          className="w-full bg-gray-50 m-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                          required
                        /> */}
                      </div>
                      <div className="w-full mb-6">
                        <label
                          htmlFor="description"
                          className="block mb-2 m-auto text-sm font-large text-gray-900"
                        >
                          Description
                        </label>
                        <textarea
                          value={description}
                          onChange={(event) =>
                            handleChange(event, setDescription)
                          }
                          type="text"
                          name="description"
                          id="description"
                          placeholder="Description"
                          className="w-full bg-gray-50 m-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="text-white dark:bg-gray-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-large rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
                      >
                        Submit
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
  );
}
