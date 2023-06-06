import { NavLink, Link } from "react-router-dom";
import AccountNav from "./AccountNav";
import SearchBar from "./SearchBar";

function NavBar(props) {
  const token = props.token;

  return (
    <>
      <nav className="bg-white">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            reloadDocument
            to="/"
            // onClick={handleClick}
            className="flex items-center"
          >
            <img
              className="w-10 h10"
              src={require("./whimzee_logo.jpg")}
              alt="whimzee_logo"
            />
            <span className="self-center text-2xl font-semibold italic text-green-700">
              Whimzee
            </span>
          </Link>
          <SearchBar
            listings={props.listings}
            setfilteredlistings={props.setfilteredlistings}
            filteredlistings={props.filteredlistings}
            setsearched={props.setsearched}
          />
          <AccountNav token={token} />
        </div>
      </nav>
      <hr />
    </>
  );
}

export default NavBar;
