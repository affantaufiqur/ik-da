import PropTypes from "prop-types";

export default function BookCard({ renderFn }) {
  return (
    <div className="col-span-3 flex h-[700px] flex-col space-y-2">
      <div className="h-full w-full bg-line" />
      <div className="flex flex-col space-y-1">
        <h3 className="font-dm-display text-lg font-medium tracking-wide md:text-2xl">Alone</h3>
        <h6 className="font-dm-sans text-sm tracking-wide text-[#5E5E5E] md:text-base">Chapter 21</h6>
        {renderFn()}
      </div>
    </div>
  );
}

BookCard.propTypes = {
  renderFn: PropTypes.func.isRequired,
};
