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
    card: { marginLeft: "auto", marginRight: "auto", textAlign: "center" },
    image: {
      height: 200,
      width: 200,
      marginTop: 20,
      marginLeft: "auto",
      marginRight: "auto",
      borderRadius: 200,
    },
    content: { objectFit: "cover" },
    uploadFailed: { color: "red", textAlign: "center", marginTop: 10 },
    uploadSuccess: { color: "lightgreen" },
    editIconButton: { float: "right", marginTop: -40 },
    editPictureBody: { width: "80%" },
    minusBottom: { marginBottom: -4 },
  },
};
