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
            navigate(0)
    };
    };

    return (
        <>
        <form onSubmit={(e) => handleOnSubmit(e)}>
            <button type="submit" className="text-gray-700 block px-4 py-2 text-sm md:dark:text-black md:hover:text-green-800">Logout</button>
        </form>
        </>
    )
}

export default Logout;
