import { useState, useEffect } from "react";

function SearchBar() {
    const [categories, setCategories] = useState([])
    const [searchedCategory, setSearchedCategory] = useState(null)
    const [searchedItemName, setSearchedItemName] = useState(null)
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(!open);
    };
    const fetchCategoryData = async () => {
        try {
        const categoryUrl = "http://localhost:8000/categories";
        const response = await fetch(categoryUrl);
        const data = await response.json();
        setCategories(data);
        } catch (error) {
        console.log("error", error);
        }
    };
    useEffect(() => {
        fetchCategoryData()
    }, []);


    return (
      <form>
      <div className="flex shadow">
        <button
        onClick={handleOpen}
        id="dropdown-button"
        data-dropdown-toggle="dropdown"
        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center rounded-l-lg bg-white"
        type="button">All categories
        <svg aria-hidden="true"
        className="w-4 h-4 ml-1"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd">
          </path>
          </svg>
          </button>
      {open ? (
      <ul
      className="absolute z-[1000] float-right m-0 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg [&[data-te-dropdown-show]]:block"
      >
        {categories.map((category) => (
            <li>{category.name}</li>
        ))}
        </ul>
      )
      : null}
  {/* <div className="z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
    <div className="py-1" role="none">

      <button className="text-gray-700 block px-4 py-2 text-sm" role="menuitem"  id="menu-item-0">Outdoors</button>
      <button className="text-gray-700 block px-4 py-2 text-sm" role="menuitem"  id="menu-item-1">Office</button>
      <button className="text-gray-700 block px-4 py-2 text-sm" role="menuitem"  id="menu-item-2">License</button>
      <button className="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem"  id="menu-item-3">Drinks</button>

    </div>
  </div> */}

          <div className="relative w-full">
            <input type="search" id="search-dropdown" className="block p-2.5 w-96 z-30 text-sm text-black bg-white rounded-r-lg border-l-white border-l-2 border border-white dark:placeholder-gray-500" placeholder="Search tshirts, paintings, cups,..." required/>
            <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-black dark:bg-black dark:hover:bg-grey-400 dark:focus:ring-black">
                <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>

    );
};

export default SearchBar;
