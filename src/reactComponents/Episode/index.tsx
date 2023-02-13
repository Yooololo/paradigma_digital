import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import parse from "html-react-parser";
import { EpisodeProps } from "../Podcast";
import { FormattedMessage } from "react-intl";
import { ThemeColorContext } from "../../context/ThemeColorWrapper";

const Episode = () => {
  const { themeColor } = useContext(ThemeColorContext);
  const {
    state: {
      episode,
      description: podcastDescription,
      artistName,
      podcastId,
      title,
    },
  }: {
    state: {
      episode: EpisodeProps;
      description: string;
      artistName: string;
      podcastId: string;
      title: string;
    };
  } = useLocation();

  return (
    <>
      <div className={`podcast ${themeColor}`}>
        <div className="podcast__detail">
          <NavLink
            state={{ id: podcastId, podcastDescription }}
            to={`/podcast/${podcastId}`}
          >
            <img src={episode.artworkUrl600} alt={artistName} />
          </NavLink>
          <hr />
          <section className="podcast__detail__section">
            <NavLink
              state={{ id: podcastId, podcastDescription }}
              to={`/podcast/${podcastId}`}
            >
              <p className={themeColor}>{episode.collectionName}</p>
              <p className={themeColor}>
                <FormattedMessage id="app.podcast.by" /> {artistName}
              </p>
            </NavLink>
          </section>
          <hr />
          <section className="podcast__detail__section">
            <p className={themeColor}>
              <FormattedMessage id="app.podcast.description" />
            </p>
            <p className={themeColor}>{podcastDescription}</p>
          </section>
        </div>
        <div className={`podcast__episode ${themeColor}`}>
          <h1>{title}</h1>
          <div>{parse(episode.description as string)}</div>
          <hr />
          <audio controls>
            <source
              src={episode.episodeUrl}
              type={`audio/${episode.episodeFileExtension}`}
            ></source>
          </audio>
        </div>
      </div>
    </>
  );
};

export default Episode;
