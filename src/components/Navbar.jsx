import { Link } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../icons/home.svg";

const Navbar = () => {
  return (
    <nav className="bg-stone-900 top-0 h-12 flex flex-row justify-center items-center w-full fixed gap-5 z-50">
      <Link to="">
        <HomeIcon className="stroke-stone-50 h-7 relative" />
      </Link>
    </nav>
  );
};

export default Navbar;

//box-shadow: 0px 4px 4px 0px ;
