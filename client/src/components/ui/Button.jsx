import PropTypes from "prop-types";

export default function Button({ children, ...props }) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center border-2 border-black bg-black px-6 py-2 font-dm-display text-sm font-medium text-white transition-all duration-100 hover:bg-white hover:text-black"
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
};
