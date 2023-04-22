import { Link } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../icons/home.svg";
import { ReactComponent as UserIcon } from "../icons/user.svg";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../App";
import * as api from "../api";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.fetchUsers().then((fetchedUsers) => {
      setUsers(fetchedUsers);
    });
  }, []);

  return (
    <nav className="bg-stone-900 top-0 h-12 flex flex-row justify-center items-center w-full fixed gap-5 z-50">
      <Link to="">
        <HomeIcon className="stroke-stone-50 h-7" />
      </Link>
      <div className="flex gap-2">
        <label className="text-stone-50" htmlFor="selectUser">
          Select a user to pretend to be:
        </label>
        <select
          name="selectUser"
          value={user}
          onChange={(event) => {
            setUser(event.target.value);
          }}
        >
          {users.map((user, index) => {
            return (
              <option key={index} value={user.username}>
                {user.username}
              </option>
            );
          })}
        </select>
        <UserIcon className="stroke-stone-50 h-7" />
      </div>
    </nav>
  );
};

export default Navbar;

//box-shadow: 0px 4px 4px 0px ;
