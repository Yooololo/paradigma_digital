import LanguageSelector from "../components/LanguageSelector";
import { cleanup, render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import English from "../languages/en.json";

afterEach(cleanup);

test("LanguageSelector renders correctly", () => {
  const { container } = render(
    <IntlProvider locale="en-US" messages={English}>
      <LanguageSelector />
    </IntlProvider>
  );
  expect(container).toMatchSnapshot();
  expect(container.querySelectorAll(".flag")).toHaveLength(3);
});
