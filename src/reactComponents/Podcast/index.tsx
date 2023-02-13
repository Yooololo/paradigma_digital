import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import BlobLoader from "../../components/BlobLoader";
import {
  useGetPodcastDetailQuery,
  useGetEpisodeListQuery,
} from "../../redux/api/apiSlice";
import { formatEpisodeData } from "../../utils/utils";
import { FormattedMessage } from "react-intl";
import { ThemeColorContext } from "../../context/ThemeColorWrapper";

interface PodcastProps {
  artistId?: number;
  artistName?: string;
  artistViewUrl?: string;
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  artworkUrl600?: string;
  collectionCensoredName?: string;
  collectionExplicitness?: string;
  collectionHdPrice?: number;
  collectionId?: number;
  collectionName?: string;
  collectionPrice?: number;
  collectionViewUrl?: string;
  contentAdvisoryRating?: string;
  country?: string;
  currency?: string;
  feedUrl?: string;
  genreIds?: string[];
  genres?: string[];
  kind?: string;
  primaryGenreName?: string;
  releaseDate?: string;
  trackCensoredName?: string;
  trackCount?: number;
  trackExplicitness?: string;
  trackId?: number;
  trackName?: string;
  trackPrice?: number;
  trackTimeMillis?: number;
  trackViewUrl?: string;
  wrapperType?: string;
}

export interface EpisodeProps extends PodcastProps {
  artistIds?: number[];
  artworkUrl160?: string;
  closedCaptioning?: string;
  description?: string;
  episodeContentType?: string;
  episodeFileExtension?: string;
  episodeGuid?: string;
  episodeUrl?: string;
  previewUrl?: string;
  releaseDate?: string;
  shortDescription?: string;
}

export interface EpisodeListTableProps {
  key: string;
  episode: EpisodeProps;
  description: string;
  artistName: string;
  title: string;
  date: string;
  duration: string;
  episodeId: string;
  podcastId: string;
}

const EpisodeRow = (props: EpisodeListTableProps) => {
  const {
    episode,
    description,
    artistName,
    title,
    date,
    duration,
    episodeId,
    podcastId,
  } = props;
  return (
    <tr>
      <td>
        <NavLink
          state={{ episode, description, artistName, podcastId, title }}
          to={`/podcast/${podcastId}/episode/${episodeId}`}
        >
          {title}
        </NavLink>
      </td>
      <td>{date}</td>
      <td>{duration}</td>
    </tr>
  );
};

const EpisodeTable = (episodeList: {
  episodeList: EpisodeProps[];
  podcastId: string;
  description: string;
  artistName: string;
}) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <FormattedMessage id="app.podcast.title" />
          </td>
          <td>
            <FormattedMessage id="app.podcast.date" />
          </td>
          <td>
            <FormattedMessage id="app.podcast.duration" />
          </td>
        </tr>
        {episodeList.episodeList.map((episode: EpisodeProps, index: number) => {
          let data = formatEpisodeData(episode);
          return (
            <EpisodeRow
              key={`${data.title}__${index}`}
              episode={episode}
              description={episodeList.description}
              artistName={episodeList.artistName}
              title={data.title}
              date={data.date}
              duration={data.duration}
              podcastId={episodeList.podcastId}
              episodeId={data.episodeId}
            />
          );
        })}
      </tbody>
    </table>
  );
};

const Podcast = () => {
  const { themeColor } = useContext(ThemeColorContext);
  const {
    state: { id: podcastId, description },
  }: { state: { id: string; description: string } } = useLocation();
  const { data, isLoading, isSuccess, isError, error } =
    useGetPodcastDetailQuery(podcastId);
  const {
    data: listData,
    isLoading: listIsLoading,
    isSuccess: listIsSuccess,
    isError: listIsError,
    error: listError,
  } = useGetEpisodeListQuery(podcastId);
  let content;
  if (isLoading || listIsLoading) {
    content = <BlobLoader />;
  } else if (isSuccess && listIsSuccess) {
    const { results } = data;
    const podcast: PodcastProps = results[0];
    const { results: resultsList } = listData;
    const episodeList: EpisodeProps[] = resultsList.slice(1);

    content = (
      <>
        <div className="podcast__detail">
          <NavLink
            state={{ id: podcastId, description }}
            to={`/podcast/${podcastId}`}
          >
            <img src={podcast.artworkUrl600} alt={podcast.artistName} />
          </NavLink>
          <hr />
          <section className="podcast__detail__section">
            <p className={themeColor}>{podcast.collectionName}</p>
            <p className={themeColor}>
              <FormattedMessage id="app.podcast.by" /> {podcast.artistName}
            </p>
          </section>
          <hr />
          <section className="podcast__detail__section">
            <p className={themeColor}>
              <FormattedMessage id="app.podcast.description" />
            </p>
            <p className={themeColor}>{description}</p>
          </section>
        </div>
        <div className="podcast__list">
          <div className={themeColor}>
            <FormattedMessage id="app.podcast.episodes" /> {podcast.trackCount}
          </div>
          <div className={themeColor}>
            <EpisodeTable
              episodeList={episodeList}
              podcastId={podcastId}
              description={description}
              artistName={podcast.artistName as string}
            />
          </div>
        </div>
      </>
    );
  }
  if (isError || listIsError) {
    if (error && "status" in error && "error" in error) {
      console.log(`Error: ${error.status} \nDescription: ${error.error}`);
    } else {
      console.log(error);
    }
    if (listError && "status" in listError && "error" in listError) {
      console.log(
        `Error: ${listError.status} \nDescription: ${listError.error}`
      );
    } else {
      console.log(listError);
    }
    content = (
      <p>
        <FormattedMessage id="app.error" />
      </p>
    );
  }
  return (
    <div
      className={isSuccess ? `podcast ${themeColor}` : `error ${themeColor}`}
    >
      {content}
    </div>
  );
};

export default Podcast;
