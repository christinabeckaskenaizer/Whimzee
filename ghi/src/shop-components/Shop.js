import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Shop(shop_id) {
  const [shop, setShop] = useState(null);

  const shopUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/shops/${7}`;
  const getShopData = async () => {
    const response = await fetch(shopUrl);
    if (response.ok) {
      const shopData = await response.json();
      setShop(shopData);
      console.log(shopData);
    }
  };

  useEffect(() => {
    getShopData();
  }, []);

  if (!shop) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <div className="w-screen">
        <section className="flex justify-center w-full bg-center bg-no-repeat bg-[url({shop.profile_picture})] bg-gray-700 bg-blend-multiply">
          <div className=" flex justify-start flex-col px-4 w-5/6">
            <h1 className="w-full mb-2 mt-6 p-4 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
              {shop.name}
            </h1>
            <p className="w-full mb-2 p-4 text-lg font-normal text-gray-300 lg:text-xl">
              {shop.description}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
