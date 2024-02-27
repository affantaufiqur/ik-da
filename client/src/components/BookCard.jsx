import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function BookCard({ id, title, imgUrl, renderFn }) {
  return (
    <div className="col-span-3 flex max-h-[1200px] min-h-[400px] flex-col space-y-2 ">
      <img src={imgUrl} alt={title} className="h-full w-full object-cover" />
      <div className="flex flex-col space-y-3">
        <Link
          to={`/story/${id}`}
          className="truncate font-dm-display text-lg font-medium tracking-normal hover:underline md:text-3xl"
        >
          {title}
        </Link>
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
