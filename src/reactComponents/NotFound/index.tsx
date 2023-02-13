import { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { ThemeColorContext } from "../../context/ThemeColorWrapper";

const NotFound = () => {
  const { themeColor } = useContext(ThemeColorContext);

  return (
    <div className={`error ${themeColor}`}>
      <p>
        <FormattedMessage id="app.e404" />
      </p>
    </div>
  );
};

export default NotFound;
