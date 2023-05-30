import { useState, useEffect } from "react";

function SearchBar(props) {
    const [categories, setCategories] = useState([])
    const [filteredListings, setFilteredListings] = useState([]);
    const setListings = props.setlistings
    const [searchedCategory, setSearchedCategory] = useState(null)
    const [searchedItemName, setSearchedItemName] = useState(null)
    const listings = props.listings
    console.log(listings)


    const fetchCategoryData = async () => {
        try {
        const categoryUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/categories`;
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

    const handleSearchedCategory = async (e) => {
        const category = e.target.value;
        setSearchedCategory(category)
    };

    const handleSearchedItemName = async (e) => {
        const name = e.target.value.toLowerCase();
        setSearchedItemName(name)
    }

    const handleClick = async (e) => {
        e.preventDefault();
        if (searchedCategory) {
            const filteredByCategory = listings.filter(
            (listing) => listing.category === Number(searchedCategory)
            )
            setFilteredListings(filteredByCategory)
        }
    }
    console.log(filteredListings)

    return (
      <form>
      <div className="flex shadow">
        <select onChange={handleSearchedCategory}>
            <option>See all categories</option>
        {categories.map((category) => {
            return (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            )
        })}
        </select>
          <div className="relative w-full">
            <input onChange={handleSearchedItemName} type="search" id="search-dropdown" className="block p-2.5 w-96 z-30 text-sm text-black bg-white rounded-r-lg border-l-white border-l-2 border border-white dark:placeholder-gray-500" placeholder="Search tshirts, paintings, cups,..." required/>
            <button onClick={handleClick} type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-black hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-black dark:bg-black dark:hover:bg-grey-400 dark:focus:ring-black">
                <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>

    );
};

export default SearchBar;
