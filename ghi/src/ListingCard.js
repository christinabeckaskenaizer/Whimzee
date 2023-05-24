import React from "react";



export default function ListingCard({ picture, name, isNew, price }) {


    return (
        <div className="flex justify-center mx-5">
            <div className="w-64 sm:w-80 overflow-hidden m-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-slate-50 dark:border-gray-700">
                <div className="rounded-t-lg overflow-hidden h-48 object-none object-center flex items-center justify-center">
                    <div>
                        <img className="rounded-t-lg object-fill object-cover" src={picture} alt="product image" />
                    </div>
                </div>
                <a href="#">
                    <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-950">{name}</h5>
                </a>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 p-1 rounded dark:bg-green-200 dark:text-gray-950">{isNew ? "New" : "Used"}</span>
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-semibold text-gray-900 dark:text-gray-950">${price}</span>
                    <a href="#" className="text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-800 hover:bg-green-900 focus:ring-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}
