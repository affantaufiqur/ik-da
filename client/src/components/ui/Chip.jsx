import PropTypes from "prop-types";

export default function Chip({ text }) {
  return (
    <div className="relative grid select-none items-center whitespace-nowrap bg-gray-100 px-3 py-1.5 font-dm-sans text-xs font-bold uppercase text-white">
      <span className="text-primary">{text}</span>
    </div>
  );
}

Chip.propTypes = {
  text: PropTypes.string,
};
