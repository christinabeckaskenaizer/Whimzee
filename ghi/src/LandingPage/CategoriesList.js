function CategoriesList({ setCategory, setsearched }) {
  const handleClick = (e) => {
    setsearched(false);
    setCategory(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col items-center h-full w-full mx-auto container px-6 py-2 xl:py-0">
        <div className="justify-between">
          <ul className="items-center w-full font-medium flex flex-col p-3 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <button
                onClick={handleClick}
                value="1"
                className="text-lg md:dark:text-black md:hover:text-green-800"
              >
                Outdoors
              </button>
            </li>
            <li>
              <button
                onClick={handleClick}
                value="2"
                className="text-lg md:dark:text-black md:hover:text-green-800"
              >
                Clothing
              </button>
            </li>
            <li>
              <button
                onClick={handleClick}
                value="3"
                className="text-lg md:dark:text-black md:hover:text-green-800"
              >
                Office
              </button>
            </li>
            <li>
              <button
                onClick={handleClick}
                value="4"
                className="text-lg md:dark:text-black md:hover:text-green-800"
              >
                Home Goods
              </button>
            </li>
            <li>
              <button
                onClick={handleClick}
                value="5"
                className="text-lg md:dark:text-black md:hover:text-green-800"
              >
                Pets
              </button>
            </li>
            <li>
              <button
                onClick={handleClick}
                value="6"
                className="text-lg md:dark:text-black md:hover:text-green-800"
              >
                Collectibles
              </button>
            </li>
            <li>
              <button
                onClick={handleClick}
                value="7"
                className="text-lg md:dark:text-black md:hover:text-green-800"
              >
                Beauty
              </button>
            </li>
            <li>
              <button
                onClick={handleClick}
                value="8"
                className="text-lg md:dark:text-black md:hover:text-green-800"
              >
                Accessories
              </button>
            </li>
            <li>
              <button
                onClick={handleClick}
                value="9"
                className="text-lg md:dark:text-black md:hover:text-green-800"
              >
                Other
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default CategoriesList;
