import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
    color: "black",
  },
  title: {
    fontSize: "1.38rem",
    // color: "#5f6368",
    color:"white",
    marginLeft: "5px",
    cursor: "pointer",
  },
  appBar: {
    // backgroundColor: "white",
    //backgroundimage:" url(https://wallpaperaccess.com/full/1912279.jpg)",
    // height: "100%",
    left:"0",
    // position: "absolute",
    backgroundColor:"#18202b",
    top: "0",
    width:"100%",
    backgroundrepeat: "no-repeat",
    webkitbackgroundsize: "cover",
    backgroundsize: "cover",
    color: "white",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerWrapper: {
    display: "flex",
    alignItems: "center",
  },
  header__wrapper__right: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    marginRight: "15px",
    color: "white",
    cursor: "pointer",
  },
}));
