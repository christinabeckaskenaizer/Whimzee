import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';

function CategoriesList() {
    const[categories, setCategories] = useState([]);

    const fetchData = async () => {
        try {
            const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/categories`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setCategories(data)

            }
    } catch (error) {
            console.log("error", error);
        }
        }

    useEffect(() => {
        fetchData();
    }, []);

    return (
    <>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
        {categories.map(category => {
            return (
                <li key={category.id}>
                <NavLink to={`/listings/category/${category.id}`} className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-black md:hover:text-green-800" aria-current="page">
                    {category.name}
                </NavLink>
                </li>
            )
        })}
      </ul>
    </div>
    </>
    )
}

export default CategoriesList
