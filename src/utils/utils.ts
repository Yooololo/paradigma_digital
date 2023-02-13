import { EpisodeProps } from "../reactComponents/Podcast";

export const formatDate = (input: any) => {
  var date = input.match(/\d+/g),
    year = date[0].substring(2), // get only two digits
    month = date[1],
    day = date[2];

  return day + "/" + month + "/" + year;
};

export function format_msToHMS(input: number): string {
  const [MS_IN_SEC, SEC_IN_DAY, SEC_IN_HOUR, SEC_IN_MIN] = [
    1000, 86400, 3600, 60,
  ];
  let seconds = Math.round(Math.abs(input) / MS_IN_SEC);
  seconds = Math.floor(seconds % SEC_IN_DAY);
  const hours = Math.floor(seconds / SEC_IN_HOUR);
  seconds = Math.floor(seconds % SEC_IN_HOUR);
  const minutes = Math.floor(seconds / SEC_IN_MIN);
  seconds = Math.floor(seconds % SEC_IN_MIN);
  const [hh, mm, ss] = [hours, minutes, seconds].map((item) =>
    item < 10 ? "0" + item : item.toString()
  );
  return hh + ":" + mm + ":" + ss;
}

export const formatEpisodeData = (episode: EpisodeProps) => {
  let title = "";
  let date = "";
  let duration = "";
  let episodeId = "";
  if (episode.trackName) {
    title = episode.trackName;
  }
  if (episode.releaseDate) {
    date = episode?.releaseDate?.substring(0, 10);
    date = formatDate(date);
  }
  if (episode.trackTimeMillis) {
    duration = format_msToHMS(episode.trackTimeMillis);
  }
  if (episode.trackViewUrl) {
    episodeId = episode?.trackViewUrl?.split("i=")[1].split("&")[0];
  }
  return { title, date, duration, episodeId };
};
