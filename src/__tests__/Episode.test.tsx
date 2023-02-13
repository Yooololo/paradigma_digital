import { mockedEpisodeState } from "../utils/mockedEpisodeState";
import { cleanup, render } from "@testing-library/react";
import Episode from "../reactComponents/Episode";
import { IntlProvider } from "react-intl";
import English from "../languages/en.json";
import { MemoryRouter } from "react-router-dom";

afterEach(cleanup);

describe("Episode", () => {
  it("should render the podcast episode and details", () => {
    const mockedState = mockedEpisodeState;

    const { container } = render(
      <MemoryRouter initialEntries={[{ state: mockedEpisodeState }]}>
        <IntlProvider locale="en-US" messages={English}>
          <Episode />
        </IntlProvider>
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
    expect(mockedState.episode).toBeDefined();
    expect(mockedState.description).toBeDefined();
    expect(mockedState.artistName).toBeDefined();
    expect(mockedState.podcastId).toBeDefined();
    expect(mockedState.title).toBeDefined();
    expect(
      container.querySelectorAll(".podcast__detail__section")
    ).toHaveLength(2);
  });
});
