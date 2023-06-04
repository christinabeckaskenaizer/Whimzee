import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";

export default function EditListing({ fetchData, shopListings, ids, token, listing }) {
    const [listings, setListings] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState(listing.name);
    const [picture, setPicture] = useState(listing.picture);
    const [quantity, setQuantity] = useState(listing.quantity);
    const [price, setPrice] = useState(listing.price);
    const [description, setDescription] = useState(listing.description);

    const [toggled, setToggled] = useState(true);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(listing.category);
    // const [currentCategory, setCurrentCategory] = useState(category);

    console.log("shopListings", shopListings)
    console.log("GOT LISTING:", listing)

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    function toggleUsed() {
        setToggled(!toggled);
        console.log("toggled");
    }

    // useEffect(() => {
    //   setListings(shopListings)
    // }, [shopListings])

    async function getCategories() {
        const categoryUrl = "http://localhost:8000/categories";
        const response = await fetch(categoryUrl);
        const categoryData = await response.json();
        console.log("category data", categoryData)
        setCategories(categoryData);
    }



    async function editListing() {
        const listingUrl = `http://localhost:8000/listings/${listing.id}`
        console.log("listing url", listingUrl)

        let data = {
            shop_id: ids.shop_id,
            name: title,
            quantity: quantity,
            description: description,
            price: parseFloat(price),
            new: toggled,
            picture: picture,
            category: category,
        };
        console.log(data)

        let response = await fetch(listingUrl,
            {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        if (response.ok) {
            fetchData();
            closeModal();
        }
    }

    useEffect(() => {
        getCategories();
    }, []);
    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-green-800"
            >
                Edit
            </button >

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={closeModal}>
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
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-4 sm:p-6 sm:pb-4">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-base text-center font-semibold leading-6 text-gray-900"
                                        >
                                            Edit Listing
                                        </Dialog.Title>
                                        <form onSubmit={editListing} className="flex flex-col items-center px-4 py-5 my-2 w-full">
                                            <div className="w-full mb-2">
                                                <label
                                                    htmlFor="small-input"
                                                    className="block mb-2 text-sm font-medium text-gray-900"
                                                >
                                                    Title
                                                </label>
                                                <input
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    type="text"
                                                    id="small-input"
                                                    className="w-full bg-gray-50 m-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                                    defaultValue={listing.name}
                                                />
                                            </div>
                                            <div className="w-full mb-2">
                                                <label
                                                    htmlFor="small-input"
                                                    className="block mb-2 text-sm font-medium text-gray-900"
                                                >
                                                    Picture URL
                                                </label>
                                                <input
                                                    onChange={(e) => setPicture(e.target.value)}
                                                    type="text"
                                                    id="small-input"
                                                    className="w-full bg-gray-50 m-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                                    defaultValue={listing.picture}
                                                />
                                            </div>
                                            <div className="w-full mb-2">
                                                <label
                                                    htmlFor="small-input"
                                                    className="block mb-2 text-sm font-medium text-gray-900"
                                                >
                                                    Quantity
                                                </label>
                                                <input
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                    type="number"
                                                    id="small-input"
                                                    className="w-full bg-gray-50 m-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                                    defaultValue={listing.quantity}
                                                />
                                            </div>
                                            <div className="w-full mb-2">
                                                <label
                                                    htmlFor="small-input"
                                                    className="block mb-2 text-sm font-medium text-gray-900"
                                                >
                                                    Price
                                                </label>
                                                <input
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    type="number"
                                                    id="small-input"
                                                    className="w-full bg-gray-50 m-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                                    defaultValue={listing.price}
                                                />
                                            </div>
                                            <div className="w-full mb-6">
                                                <label
                                                    htmlFor="message"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                                                >
                                                    Description
                                                </label>
                                                <textarea
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    id="message"
                                                    rows="4"
                                                    className="w-full bg-gray-50 m-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                                    defaultValue={listing.description}
                                                ></textarea>
                                            </div>
                                            <div className="w-full mb-2">
                                                <label className="relative inline-flex items-center mr-5 cursor-pointer">
                                                    <input
                                                        onChange={toggleUsed}
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        value={listing.new}
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                                    <span className="ml-3 text-sm font-medium text-gray-900">
                                                        Used?
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="w-full mb-2">

                                                <select
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    className="w-full bg-gray-50 m-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                                    value={listing.category.id}
                                                    defaultValue={listing.category}
                                                >
                                                    {/* <option>Choose a category</option> */}
                                                    {categories.map((category) => (
                                                        <option key={category.id} value={category.id}>
                                                            {category.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    className="text-white dark:bg-gray-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-large rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
                                                    onClick={editListing}
                                                >
                                                    Update
                                                </button>
                                            </div>
                                        </form>

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
