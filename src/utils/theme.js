import { createMuiTheme } from "@material-ui/core/styles";
import lightBlue from "@material-ui/core/colors/lightBlue";

const light = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      ...lightBlue,
      contrastText: "#fff"
    }
  }
});

const dark = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      ...lightBlue,
      contrastText: "#fff"
    }
  }
});

export default { light, dark };
