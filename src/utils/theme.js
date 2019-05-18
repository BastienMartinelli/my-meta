import { createMuiTheme } from "@material-ui/core/styles";
import lightBlue from "@material-ui/core/colors/lightBlue";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      ...lightBlue,
      contrastText: "#fff"
    }
  }
});

export default theme;
