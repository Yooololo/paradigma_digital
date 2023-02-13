import { StrictMode, Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";

import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";

import LanguageWrapper from "./context/LanguageWrapper";
import ThemeColorWrapper from "./context/ThemeColorWrapper";

import AppRouter from "./AppRouter";
import NavBar from "./components/NavBar";
import Blob from "./components/BlobLoader";
import apiSlice from "./redux/api/apiSlice";

const App = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <LanguageWrapper>
          <ThemeColorWrapper>
            <ApiProvider api={apiSlice}>
              <BrowserRouter>
                <Suspense fallback={<Blob />}>
                  <NavBar />
                  <AppRouter />
                </Suspense>
              </BrowserRouter>
            </ApiProvider>
          </ThemeColorWrapper>
        </LanguageWrapper>
      </Provider>
    </StrictMode>
  );
};

export default App;
