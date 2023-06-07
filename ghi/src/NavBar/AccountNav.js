import Logout from "./Logout";
import useUser from "../custom-hooks/useUser";
import { NavLink } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

export default function AccountNav({ token }) {
  const { user } = useUser(token);

  if (token) {
    return (
      <>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li>
              <NavLink
                to="#"
                className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-black md:hover:text-green-800"
                aria-current="page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </NavLink>
            </li>
            <li>
              <Menu as="div">
                <div>
                  <Menu.Button className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-black md:hover:text-green-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {() => (
                          <div className="py-1" role="none">
                            <div
                              className="text-gray-700 block px-4 py-1 text-sm"
                              role="menuitem"
                              id="menu-item-0"
                            >
                              {user.username}
                            </div>
                            <div
                              className="text-gray-700 block px-4 py-1 text-sm"
                              role="menuitem"
                              id="menu-item-1"
                            >
                              {user.email}
                            </div>
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {() => (
                          <NavLink
                            to="/account"
                            className="text-gray-700 block px-4 py-2 text-sm md:dark:text-black md:hover:text-green-800"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-2"
                          >
                            Your Account
                          </NavLink>
                        )}
                      </Menu.Item>
                      <Logout token={token} />
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </li>
            <li>
              <NavLink
                to="/cart"
                className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-black md:hover:text-green-800"
                aria-current="page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </NavLink>
            </li>
          </ul>
        </div>
      </>
    );
  } else {
    return (
      <NavLink
        to="/login"
        className="block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 md:text-black md:hover:text-green-800"
        aria-current="page"
      >
        Login/Sign up
      </NavLink>
    );
  }
}
