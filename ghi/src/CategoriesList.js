import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';

function CategoriesList({setCategory}) {
    const handleClick = (e) => {
        setCategory(e.target.value)
    }

    return (
    <>
        <div className="h-full w-full mx-auto container px-6 py-2 xl:py-0">
            <div className="items-center justify-between">
                <ul className="items-center w-full font-medium flex flex-col p-3 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
                        <li><button onClick={handleClick} value="1" className="text-lg md:dark:text-black md:hover:text-green-800">Outdoors</button></li>
                        <li><button onClick={handleClick} value="2" className="text-lg md:dark:text-black md:hover:text-green-800">Clothing</button></li>
                        <li><button onClick={handleClick} value="3" className="text-lg md:dark:text-black md:hover:text-green-800">Office</button></li>
                        <li><button onClick={handleClick} value="4" className="text-lg md:dark:text-black md:hover:text-green-800">Home Goods</button></li>
                        <li><button onClick={handleClick} value="5" className="text-lg md:dark:text-black md:hover:text-green-800">Pets</button></li>
                        <li><button onClick={handleClick} value="6" className="text-lg md:dark:text-black md:hover:text-green-800">Collectibles</button></li>
                        <li><button onClick={handleClick} value="7" className="text-lg md:dark:text-black md:hover:text-green-800">Beauty</button></li>
                        <li><button onClick={handleClick} value="8" className="text-lg md:dark:text-black md:hover:text-green-800">Accessories</button></li>
                        <li><button onClick={handleClick} value="9" className="text-lg md:dark:text-black md:hover:text-green-800">Other</button></li>
                </ul>

            </div>

        </div>
    </>
    );
}




export default CategoriesList
