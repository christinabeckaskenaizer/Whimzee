import { NavLink } from "react-router-dom"

export default function Footer() {
    return (
        <footer className="bg-white rounded-lg shadow m-4">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center">Whimzee
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
                    <li>
                        <NavLink to="/about" className="mr-4 hover:underline md:mr-6 ">About Us</NavLink>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
