import { NavLink } from "react-router-dom"

export default function Footer() {
    return (
<footer class="bg-white">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <span class="text-base text-bold text-black sm:text-center dark:text-black hover:text-green-700"><NavLink to="/about" class="hover:underline">About us</NavLink>
    </span>
    </div>
</footer>
    )
}
