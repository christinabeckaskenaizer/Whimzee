import { useNavigate, useLocation } from "react-router-dom";

function Logout(props) {
    const token = props.token
    const location = useLocation()
    const navigate = useNavigate()
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/token`;
        const fetchConfig = {
            method:'DELETE',
            credentials: "include",
            headers: {
                'Authorization': `bearer ${token}`,
            }
        };
        const response = await fetch(url, fetchConfig);
        e.target.reset();
        if (response.ok) {
            console.log(token)
            if (location.pathname === "/") {
                navigate(0)
            };
            navigate(0, "/")
    };
    };

    return (
        <li>
        <form onSubmit={(e) => handleOnSubmit(e)}>
            <button type="submit" className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-black md:hover:text-green-800">Logout</button>
        </form>
        </li>
    )
}

export default Logout;
