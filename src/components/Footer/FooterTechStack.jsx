import ModalResourceLink from "./ModalResourceLink";
import { useState } from "react";
import PropTypes from "prop-types";

function FooterTechStack({ techstack }) {
  const [modalIndex, setModalIndex] = useState(null);
  const handleClick = (e, url) => {
    e.preventDefault();
    setModalIndex(url);
  };

  return (
    <div className="box2 px-6 py-6 md:px-8 md:py-8 w-full lg:w-2/3 border bg-gray-800 border-footerBoxColor flex flex-col items-center rounded-3xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Tech Stack
      </h2>

      <div className="grid grid-cols-2 gap-4 w-full">
        {techstack.map((tech, index) => (
          <div
            key={index}
            className={`flex justify-center items-center px-4 ${
              tech.name === "tailwindcss" ? "col-span-2 w-full mt-6" : ""
            }`}>
            <a
              href="#"
              className="group"
              onClick={e => handleClick(e, tech.url)}>
              <img
                src={tech.image}
                alt={tech.name}
                className={`object-contain ${
                  tech.name === "tailwindcss"
                    ? "w-[90%] md:w-full"
                    : "w-24 xl:w-32 h-24 xl:h-32"
                }`}
              />
            </a>
          </div>
        ))}
      </div>

      {modalIndex && (
        <ModalResourceLink url={modalIndex} handleClick={setModalIndex} />
      )}
    </div>
  );
}

FooterTechStack.propTypes = {
  techstack: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      url: PropTypes.string
    })
  ).isRequired
};

export default FooterTechStack;
