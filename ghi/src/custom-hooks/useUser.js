import { useEffect, useState } from "react";

const useUser = (token) => {
  const [user, setUser] = useState(null);
  const [ids, setIds] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const userResponse = await fetch(
        `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/token`,
        {
          credentials: "include",
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      const userResult = await userResponse.json();
      setUser(userResult.account);

      const idResponse = await fetch(
        `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/user/${userResult.account.id}`
      );
      const idResult = await idResponse.json();
      setIds(idResult);
    };
    if (token) {
      getUser();
    }
  }, [token]);

  return { user: user, ids: ids };
};

export default useUser;
