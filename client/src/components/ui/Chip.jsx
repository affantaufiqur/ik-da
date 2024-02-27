import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Chip({ text, href }) {
  return (
    <div className="relative grid select-none items-center whitespace-nowrap bg-gray-100 px-3 py-1.5 font-dm-sans text-xs font-bold uppercase text-white hover:bg-gray-200">
      {href ? (
        <Link to={href} className="text-primary hover:cursor-pointer">
          {text}
        </Link>
      ) : (
        <span className="text-primary">{text}</span>
      )}
    </div>
  );
}

Chip.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string,
};
