import PropTypes from "prop-types";

function AnchorLink({ href, text, children, ...attrs }) {
  return (
    <a href={href} {...attrs}>
      {children && children}
      {text}
    </a>
  );
}

AnchorLink.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.element
};

export default AnchorLink;
