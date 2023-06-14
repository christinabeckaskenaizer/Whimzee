import { NavLink } from "react-router-dom"

export default function Footer() {
    return (
<footer className="bg-white">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <span className="text-base text-bold text-black sm:text-center dark:text-black hover:text-green-700"><NavLink to="/about" className="hover:underline">About us</NavLink>
    </span>
    </div>
</footer>
    )
}
