import { useEffect, useState } from "react";

const useShop = (ids) => {
  const [shop, setShop] = useState(null);

  useEffect(() => {
    const getShop = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/shops/${ids.shop_id}`
      );
      const result = await response.json();

      setShop(result);
    };

    if (ids?.shop_id) {
      getShop();
    }
  }, [ids]);

  return { shop: shop };
};

export default useShop;
