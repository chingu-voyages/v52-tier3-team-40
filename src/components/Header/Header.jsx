import PropTypes from "prop-types";
import Nav from "./Nav";
import spaceDiscoveryLogo from "../../assets/images/Header/spaceDiscoveryLogo.jpg";

function Header() {
  return (
    <header className="col-span-12 w-full bg-gray-800 py-4">
      <section className="flex items-center justify-between px-4 mx-auto h-full max-w-screen-xl">
        <img
          src={spaceDiscoveryLogo}
          alt="Space Discovery Logo"
          className="h-24 max-w-full"
        />
        <Nav />
      </section>
    </header>
  );
}

Header.propTypes = {
  action: PropTypes.string,
  onClickHandler: PropTypes.func
};

export default Header;
