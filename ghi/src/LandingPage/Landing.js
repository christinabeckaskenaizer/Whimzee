import CategoriesList from "../CategoriesList";
import AllListings from "../AllListings";

function Landing(props) {
  return (
    <>
      <header><CategoriesList /></header>
      <div className="px-4 py-5 my-20 text-center">
        <div>
          <h1>Welcome friend!</h1>
        </div>
        <h1 className="text-center mb-20 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl text-black">
          Where you buy your stuff
        </h1>
        <h1 className="text-left font-bold text-lg pl-9">Recently Posted</h1>
        <AllListings ></AllListings>
      </div>
    </>
  );
}

export default Landing;
