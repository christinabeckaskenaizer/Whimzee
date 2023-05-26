import AllListings from "../AllListings";

function Landing(props) {
  return (
    <>
      <header>here are categories</header>
      <div className="px-4 py-5 my-20 text-center">
        <div>
          <h1>Welcome friend!</h1>
        </div>
        <h1 className="text-center mb-20 text-3xl font-extrabold leading-none tracking-tight  md:text-5xl lg:text-6xl text-black">
          Where you buy your stuff
        </h1>
        <h1 className="text-left font-bold text-lg pl-9">Recently Posted</h1>
        {/* <AllListings ></AllListings> */}
        <AllListings listings={props.listings} />
      </div>
    </>
  );
}

export default Landing;
