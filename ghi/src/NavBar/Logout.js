import { NavLink } from 'react-router-dom';

function Logout() {
    return (
        <li>
          <NavLink to="#" className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-black md:hover:text-green-800" aria-current="page">
          Logout
          </NavLink>
        </li>
    )
}

export default Logout;
