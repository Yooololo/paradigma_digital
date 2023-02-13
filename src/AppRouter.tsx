import { Route, Routes } from "react-router-dom";
import Episode from "./reactComponents/Episode";
import NotFound from "./reactComponents/NotFound";
import Podcast from "./reactComponents/Podcast";
import Podcasts from "./reactComponents/Podcasts";

const AppRouter = () => {
  return (
    <div className="app__container">
      <Routes>
        <Route path="/" element={<Podcasts />} />
        <Route path="/podcast/:podcastId" element={<Podcast />} />
        <Route
          path="/podcast/:podcastId/episode/:episodeId"
          element={<Episode />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
