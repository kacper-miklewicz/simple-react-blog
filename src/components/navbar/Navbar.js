import "./Navbar.css";

import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li className="site-title">
          <Link to="/">
            <h2>My Blog</h2>
          </Link>
        </li>
        <li>
          <NavLink to="create">Add post</NavLink>
        </li>
        <li>
          <NavLink to="about">About us</NavLink>
        </li>
      </ul>
    </nav>
  );
}
