import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function BookCard({ id, title, chapter, imgUrl, renderFn }) {
  return (
    <div className="col-span-3 flex max-h-[1200px] min-h-[400px] flex-col space-y-2 ">
      <img src={imgUrl} alt={title} className="h-full w-full object-cover" />
      <div className="flex flex-col space-y-1">
        <Link
          to={`/story/${id}`}
          className="truncate font-dm-display text-lg font-medium tracking-wide hover:underline md:text-2xl"
        >
          {title}
        </Link>
        <h6 className="font-dm-sans text-sm tracking-wide text-[#5E5E5E] md:text-base">{chapter}</h6>
        {renderFn && renderFn()}
      </div>
    </div>
  );
}

BookCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  chapter: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  renderFn: PropTypes.func,
};
