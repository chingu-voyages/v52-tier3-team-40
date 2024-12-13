import { useState } from "react";
import AnchorLink from "../UI/AnchorLink";
import BurgerMenu from "./BurgerMenu";
import { Link } from "react-router-dom";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuClasses = isMenuOpen
    ? "flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full bg-neutral-500 z-40"
    : "hidden md:flex";

  const listClasses = isMenuOpen
    ? "flex flex-col items-center gap-6"
    : "font-medium flex flex-col md:flex-row md:items-center md:space-x-8";

  const linkClasses = "text-xl p-2.5 text-navLinkColor";

  return (
    <>
      <BurgerMenu isOpen={isMenuOpen} onChangeHandler={toggleMenuHandler} />
      <nav className={menuClasses}>
        <ul className={listClasses}>
          <li>
            <AnchorLink
              href="#"
              className={`${linkClasses} underline`}
              text="Home"
            />
          </li>
          <li>
            <AnchorLink
              href="#footer"
              className={linkClasses}
              text="About Us"
            />
          </li>
          <li className="text-center">
            <Link to="/resources" className={linkClasses}>
              Resources
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
