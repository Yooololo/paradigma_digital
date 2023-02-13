import { useContext, useEffect, useState } from "react";
import BlobLoader from "../../components/BlobLoader";
import { NavLink } from "react-router-dom";
import { useGetTopNPodcastsQuery } from "../../redux/api/apiSlice";
import Pagination from "../../components/Pagination";
import { FormattedMessage, useIntl } from "react-intl";
import { ThemeColorContext } from "../../context/ThemeColorWrapper";
import ReactSelect, { SingleValue } from "react-select";

interface Attributes {
  ["im:id"]?: string;
  label?: string;
  scheme?: string;
  term?: string;
  href?: string;
  height?: string;
  amount?: string;
  currency?: string;
  rel?: string;
  type?: string;
}

interface PodcastsProps {
  category?: { attributes: Attributes };
  id?: { label: string; attributes: Attributes };
  ["im:artist"]?: { label: string; attributes: Attributes };
  ["im:contentType"]?: { attributes: Attributes };
  ["im:image"]?: { label: string; attributes: Attributes }[];
  ["im:name"]?: { label: string };
  ["im:price"]?: { label: string; attributes: Attributes };
  ["im:releaseDate"]?: { label: string; attributes: Attributes };
  link?: { attributes: Attributes };
  rights?: { label: string };
  summary?: { label: string };
  title?: { label: string };
}

const Podcasts = () => {
  const intl = useIntl();
  const { themeColor } = useContext(ThemeColorContext);
  const [search, setSearch] = useState("");
  const [sorted, setSorted] = useState("");
  const { data, isLoading, isSuccess, isError, error } =
    useGetTopNPodcastsQuery(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [podcastsPerPage, setPodcastsPerPage] = useState(20);
  const indexOfLastPost = currentPage * podcastsPerPage;
  const indexOfFirstPost = indexOfLastPost - podcastsPerPage;
  const pagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (search) {
      setCurrentPage(1);
    }
  }, [search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [podcastsPerPage]);

  let content;
  if (isLoading) {
    content = <BlobLoader />;
  } else if (isSuccess) {
    const {
      feed: { entry: podcastsList },
    } = data;
    const filtederPodcasts = podcastsList.filter((podcast: PodcastsProps) => {
      return search.toLowerCase() === ""
        ? podcast
        : podcast["im:name"]?.label?.toLowerCase().includes(search) ||
            podcast["im:artist"]?.label?.toLowerCase().includes(search);
    });
    const sortedPodcasts = sorted
      ? filtederPodcasts.sort((a: any, b: any) => {
          return sorted === "A-Z"
            ? a["im:name"].label
                .replace(/['"]+/g, "")
                .localeCompare(b["im:name"].label.replace(/['"]+/g, ""))
            : b["im:name"].label
                .replace(/['"]+/g, "")
                .localeCompare(a["im:name"].label.replace(/['"]+/g, ""));
        })
      : filtederPodcasts;
    const currentPodcasts = sortedPodcasts.slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    const previousPage = () => {
      if (currentPage !== 1) {
        setCurrentPage(currentPage - 1);
      }
    };
    const nextPage = () => {
      if (currentPage !== Math.ceil(sortedPodcasts.length / podcastsPerPage)) {
        setCurrentPage(currentPage + 1);
      }
    };

    const sortingOptions = [
      {
        value: "",
        label: intl.formatMessage({
          id: "app.podcasts.sort.placeholder",
        }),
      },
      { value: "A-Z", label: "A - Z" },
      { value: "Z-A", label: "Z - A" },
    ];

    const perPageOptions = [
      { value: 8, label: "8" },
      { value: 20, label: "20" },
      { value: 40, label: "40" },
      { value: 100, label: "100" },
    ];

    content = (
      <div className={`podcastsContainer ${themeColor}`}>
        <div className="filter">
          <p></p>
          <div className="filter__organize">
            <div className="filter__podcastsLength">
              {sortedPodcasts.length}
            </div>
            <input
              className={`filter__input ${themeColor}`}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={intl.formatMessage({
                id: "app.podcasts.filter.placeholder",
              })}
            />
            <div className="resultsPerPage">
              <label>
                {intl.formatMessage({
                  id: "app.podcasts.perPage.placeholder",
                })}{" "}
              </label>
              <ReactSelect
                isSearchable={false}
                options={perPageOptions}
                className={`reactSelect ${themeColor}`}
                classNamePrefix={"reactSelect"}
                placeholder={podcastsPerPage}
                onChange={(
                  e: SingleValue<{
                    value: number;
                    label: string;
                  }>
                ) => {
                  if (e) setPodcastsPerPage(e.value);
                }}
              />
            </div>
          </div>
          <ReactSelect
            isSearchable={false}
            options={sortingOptions}
            className={`reactSelect ${themeColor}`}
            classNamePrefix={"reactSelect"}
            placeholder={intl.formatMessage({
              id: "app.podcasts.sort.placeholder",
            })}
            onChange={(
              e: SingleValue<{
                value: string;
                label: string;
              }>
            ) => {
              if (e) setSorted(e.value);
            }}
          />
        </div>
        <Pagination
          podcastsPerPage={podcastsPerPage}
          totalPodcasts={sortedPodcasts.length}
          pagination={pagination}
          previousPage={previousPage}
          nextPage={nextPage}
          currentPage={currentPage}
        />
        {currentPodcasts.length > 0 ? (
          <div className="podcasts">
            {currentPodcasts.map((podcast: PodcastsProps, index: number) => {
              return (
                <NavLink
                  state={{
                    id: `${podcast["id"]?.attributes["im:id"]}`,
                    description: `${podcast["summary"]?.label}`,
                  }}
                  key={`podcast__${index}`}
                  to={`/podcast/${podcast["id"]?.attributes["im:id"]}`}
                >
                  <div className="podcasts__podcast">
                    <img
                      src={podcast["im:image"] && podcast["im:image"][2].label}
                      alt={podcast["im:name"]?.label}
                    />
                    <div>
                      <h2 className={themeColor}>
                        {podcast["im:name"]?.label
                          ?.toUpperCase()
                          .replace(/['"]+/g, "")}
                      </h2>
                      <h3 className={themeColor}>
                        <FormattedMessage id="app.podcasts.author" />{" "}
                        {podcast["im:artist"]?.label?.toUpperCase()}
                      </h3>
                    </div>
                  </div>
                </NavLink>
              );
            })}
          </div>
        ) : (
          <div className={`error ${themeColor}`}>
            <p>
              <FormattedMessage id="app.noResults" />" {search} "
            </p>
          </div>
        )}
      </div>
    );
  }
  if (isError) {
    if ("status" in error && "error" in error) {
      console.log(`Error: ${error.status} \nDescription: ${error.error}`);
    } else {
      console.log(error);
    }

    content = (
      <p>
        <FormattedMessage id="app.error" />
      </p>
    );
  }
  return (
    <div className={!isSuccess ? `error ${themeColor}` : ""}>{content}</div>
  );
};

export default Podcasts;
