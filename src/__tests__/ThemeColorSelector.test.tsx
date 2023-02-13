import { cleanup, render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import English from "../languages/en.json";
import ThemeColorSelector from "../components/ThemeColorSelector";

afterEach(cleanup);

test("LanguageSelector renders correctly", () => {
  const { container } = render(
    <IntlProvider locale="en-US" messages={English}>
      <ThemeColorSelector />
    </IntlProvider>
  );
  expect(container).toMatchSnapshot();
  expect(container.querySelector(".ThemeColorSelector")).toBeTruthy();
  expect(container.querySelectorAll(".theme__icon__part")).toHaveLength(9);
});
