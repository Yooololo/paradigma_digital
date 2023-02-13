import { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { ThemeColorContext } from "../../context/ThemeColorWrapper";

const Pagination = ({
  podcastsPerPage,
  totalPodcasts,
  pagination,
  previousPage,
  nextPage,
  currentPage,
}: {
  podcastsPerPage: number;
  totalPodcasts: number;
  pagination: (pageNumber: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  currentPage: number;
}) => {
  const { themeColor } = useContext(ThemeColorContext);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPodcasts / podcastsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {pageNumbers.length > 1 ? (
        <div className={`pagination ${themeColor}`}>
          <ul className="pagination__options">
            <li
              onClick={previousPage}
              className={`pagination__options__button ${
                currentPage === 1 ? "disabled" : ""
              }`}
            >
              <FormattedMessage id="app.prev" />
            </li>
            {pageNumbers.map((number) => (
              <li
                key={number}
                onClick={() => {
                  pagination(number);
                }}
                className={`pagination__options__page ${themeColor} ${
                  currentPage === number
                    ? "pagination__options__page__active"
                    : ""
                }`}
              >
                {number}
              </li>
            ))}
            <li
              onClick={nextPage}
              className={`pagination__options__button ${
                currentPage === Math.ceil(totalPodcasts / podcastsPerPage)
                  ? "disabled"
                  : ""
              }`}
            >
              <FormattedMessage id="app.next" />
            </li>
          </ul>
          <p>
            {podcastsPerPage * currentPage - podcastsPerPage + 1} -{" "}
            {podcastsPerPage * currentPage < totalPodcasts
              ? podcastsPerPage * currentPage
              : totalPodcasts}
          </p>
        </div>
      ) : (
        <div className="hidden" />
      )}
    </>
  );
};
export default Pagination;
