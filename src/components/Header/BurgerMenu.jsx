import PropTypes from "prop-types";

function BurgerMenu({ isOpen, onChangeHandler }) {
  const barClasses = [
    isOpen ? "transform rotate-45 translate-y-4 bg-navLinkColor" : "bg-white",
    isOpen ? "" : "bg-white",
    isOpen ? "transform -rotate-45 -translate-y-2 bg-navLinkColor" : "bg-white"
  ];

  return (
    <div
      className="absolute top-6 right-4 z-50 w-8 h-8 cursor-pointer md:hidden"
      onClick={onChangeHandler}>
      {barClasses.map((classes, index) => (
        <div
          key={index}
          className={`h-1 w-8 transition-all duration-300 ease-in-out ${
            index < 2 ? "mb-2" : ""
          } ${classes}`}></div>
      ))}
    </div>
  );
}

BurgerMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onChangeHandler: PropTypes.func.isRequired
};

export default BurgerMenu;
