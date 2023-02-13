import { render } from "@testing-library/react";
import AppRouter from "../AppRouter";
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import English from "../languages/en.json";

describe("AppRouter", () => {
  it('renders the Not Found component when the path is "/*" and not in Router', () => {
    const { container } = render(
      <MemoryRouter initialEntries={[{ pathname: "/asdasd" }]}>
        <IntlProvider locale="en-US" messages={English}>
          <AppRouter />
        </IntlProvider>
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
    expect(container.querySelectorAll("error")).toBeTruthy();
    expect(container.getElementsByTagName("FormattedMessage")).toBeTruthy();
  });

  it('renders the Episode component when the path is "/podcast/:podcastId/episode/:episodeId"', () => {
    const { container } = render(
      <MemoryRouter
        initialEntries={[{ pathname: "/podcasts/123123/episode/123123" }]}
      >
        <IntlProvider locale="en-US" messages={English}>
          <AppRouter />
        </IntlProvider>
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
    expect(container.querySelectorAll("podcast__episode")).toBeTruthy();
    expect(container.getElementsByTagName("audio")).toBeTruthy();
  });
});
