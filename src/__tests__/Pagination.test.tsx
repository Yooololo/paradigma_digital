import Pagination from "../components/Pagination";
import React from "react";
import { cleanup, render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import English from "../languages/en.json";

afterEach(cleanup);

test("Pagination should render the pagination component correctly", () => {
  const mockedThemeColor = "dark";
  const mockUseContext = jest.fn();
  mockUseContext.mockReturnValueOnce(mockedThemeColor);
  jest
    .spyOn(React, "useContext")
    .mockImplementationOnce(() => mockUseContext());

  const mockedPodcastsPerPage = 10;
  const mockedTotalPodcasts = 50;
  const mockedPagination = jest.fn();
  const mockedPreviousPage = jest.fn();
  const mockedNextPage = jest.fn();
  const mockedCurrentPage = 1;

  const { container } = render(
    <IntlProvider locale="en-US" messages={English}>
      <Pagination
        podcastsPerPage={mockedPodcastsPerPage}
        totalPodcasts={mockedTotalPodcasts}
        pagination={mockedPagination}
        previousPage={mockedPreviousPage}
        nextPage={mockedNextPage}
        currentPage={mockedCurrentPage}
      />
    </IntlProvider>
  );

  expect(container).toMatchSnapshot();
  expect(mockUseContext).toHaveBeenCalled();
  expect(container.querySelector(".pagination")).toBeTruthy();
  expect(container.querySelector(".pagination__options")).toBeTruthy();
  expect(container.querySelector(".pagination__options__button")).toBeTruthy();
  expect(container.querySelectorAll(".pagination__options__page")).toHaveLength(
    5
  );
});
