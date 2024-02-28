import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ prevPage, currentPage, nextPage, totalPage, renderPagination }) {
  return (
    <div className="mt-24 flex items-center justify-end gap-4">
      <Link to={`?page=${prevPage ? prevPage : 1}`}>
        <button className="flex items-center gap-2" disabled={Number(currentPage) === 1}>
          <ChevronLeft strokeWidth={2} className="h-4 w-4" />
          <span className="hidden md:inline">Previous</span>
        </button>
      </Link>
      <div className="flex items-center gap-2 rounded-none">{renderPagination()}</div>
      <Link to={`?page=${nextPage ? nextPage : totalPage}`}>
        <button className="flex items-center gap-2" disabled={Number(currentPage) === totalPage}>
          <span className="hidden md:inline">Next</span>
          <ChevronRight strokeWidth={2} className="h-4 w-4" />
        </button>
      </Link>
    </div>
  );
}

Pagination.propTypes = {
  prevPage: PropTypes.number,
  currentPage: PropTypes.string,
  nextPage: PropTypes.number,
  totalPage: PropTypes.number,
  renderPagination: PropTypes.func,
};
