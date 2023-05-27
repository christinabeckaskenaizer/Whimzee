import CategoriesList from "../CategoriesList";
import AllListings from "../AllListings";
import { useState } from "react";

function Landing(props) {
  const [category, setCategory] = useState(null)
  console.log(category)
  return (
      <>
      <CategoriesList
      setCategory={setCategory}
      />
      <div className="px-4 py-5 my-20 text-center">
        <h1 className="text-left font-bold text-lg pl-9">Recently Posted</h1>
        <AllListings listings={props.listings} category={category}/>
      </div>
    </>
  );
}

export default Landing;
