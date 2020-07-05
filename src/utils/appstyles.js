export default {
  palette: {
    primary: {
      light: "#81c784",
      main: "#4caf50",
      contrastText: "#fff",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#81c784",
      main: "#388e3c",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#fff",
    },
  },
  loginRegister: {
    formContainer: { fontWeight: "bold", color: "#434343" },
    pageImage: { textAlign: "center" },
    textField: { marginTop: -10 },
    button: { marginTop: 20 },
    progress: { marginBottom: 20 },
  },
  marginLeftRight: {
    placeHolder: { marginLeft: 10, marginRight: 10 },
  },
  shouts: {
    card: { display: "flex", marginBottom: 10, marginRight: 10 },
    image: { minWidth: 100, margin: 5, borderRadius: 5 },
    content: { objectFit: "cover" },
  },
  profile: {
    card: { display: "flex" },
    image: {
      height: 240,
      Width: 100,
      marginTop: 20,
      marginLeft: 50,
      marginRight: 50,
      borderRadius: 5,
    },
    content: { objectFit: "cover" },
  },
};
