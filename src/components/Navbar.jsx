import { ReactComponent as HamburgerMenuIcon } from "../icons/menu.svg";
import { ReactComponent as UserSelectIcon } from "../icons/user.svg";
import { ReactComponent as SearchButtonIcon } from "../icons/search.svg";

const Navbar = () => {
  return (
    <nav className="h-[40px] bg-stone-900 flex flex-row justify-between items-center p-1.5 sticky top-0 z-10">
      <button>
        <UserSelectIcon className="stroke-stone-700 h-7 relative bottom-[1px]" />
      </button>
      <div className="relative flex flex-col">
        <input
          type="text"
          className="w-64 h-6 rounded-xl bg-stone-300 text-center placeholder-stone-700 shadow-inner font-light shadow-[#00000040]"
          placeholder="Search"
        ></input>
        <SearchButtonIcon className="absolute top-[2px] right-[5px] stroke-stone-500 h-5" />
      </div>
      <button>
        <HamburgerMenuIcon className="stroke-stone-700 h-7 relative bottom-[1px]" />
      </button>
    </nav>
  );
};

export default Navbar;

//box-shadow: 0px 4px 4px 0px ;
