import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'


export default function MyModal({ ids }) {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState('');
    const [picture, setPicture] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [toggled, setToggled] = useState(true);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState();

    // console.log("data", data)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    function toggleUsed() {
        setToggled(!toggled);
        console.log("toggled")
    }

    async function getCategories() {
        const categoryUrl = "http://localhost:8000/categories"
        const response = await fetch(categoryUrl)
        const categoryData = await response.json();
        setCategories(categoryData)
    }

    const createListing = async (event) => {
        try {
            event.preventDefault();

            let data = {
                "shop_id": ids.shop_id,
                "name": title,
                "quantity": quantity,
                "description": description,
                "price": parseFloat(price),
                "new": toggled,
                "picture": picture,
                "category": category
            }
            // console.log(typeof data.price)
            // return

            const url = "http://localhost:8000/listings"
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            console.log("success:", result)
        } catch (error) {
            console.error("error:", error);
        }
    }

    // const data = {
    //     "shop_id": 0,
    //     "name": "string",
    //     "quantity": 0,
    //     "description": "string",
    //     "price": 0,
    //     "new": true,
    //     "picture": "string",
    //     "category": 0
    // }

    useEffect(() => {
        getCategories();
    }, [])
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center">
                <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md bg-green-900 px-4 py-2 text-sm font-medium text-white hover:bg-green-950 focus:outline-none"
                >
                    Add a Listing
                </button>
            </div>

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
                                        Add a new listing
                                    </Dialog.Title>
                                    <form onSubmit={createListing} className="mt-2">
                                        <div>
                                            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                                            <input onChange={(e) => setTitle(e.target.value)} type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900">Picture URL</label>
                                            <input onChange={(e) => setPicture(e.target.value)} type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
                                            <input onChange={(e) => setQuantity(e.target.value)} type="number" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                                            <input onChange={(e) => setPrice(e.target.value)} type="number" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        </div>
                                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Description</label>
                                        <textarea onChange={(e) => setDescription(e.target.value)} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your item description here..."></textarea>

                                        <div className='mt-4'>
                                            <label className="relative inline-flex items-center mr-5 cursor-pointer">
                                                <input onChange={toggleUsed} type="checkbox" value="" className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                                <span className="ml-3 text-sm font-medium text-gray-900">Used?</span>
                                            </label>
                                        </div>
                                    </form>
                                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                                    <select onChange={(e) => setCategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option >Choose a category</option>
                                        {categories.map((category) =>
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        )}
                                    </select>
                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-green-900 px-4 py-2 text-sm font-medium text-white hover:bg-green-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={createListing}>
                                            Create
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
