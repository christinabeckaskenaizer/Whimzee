import CategoriesList from "../CategoriesList";
import AllListings from "../listing-components/AllListings";
import { useState } from "react";

function Landing(props) {
  const [category, setCategory] = useState(null)
  return (
    <>
      <CategoriesList
        setCategory={setCategory}
        setsearched={props.setsearched}
      />
      <div className="px-4 py-5 my-20 text-center">
        <h1 className="text-left font-bold text-lg pl-9">Recently Posted</h1>
        <AllListings listings={props.listings} category={category} filteredlistings={props.filteredlistings} searched={props.searched}/>
      </div>
    </>
  );
}

export default Landing;
