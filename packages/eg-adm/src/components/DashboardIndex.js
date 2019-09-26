import React from "react";
import clsx from "clsx";
import { Router } from "@reach/router";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import DashboardHome from './DashboardHome';
import One from './One/Index';
import SidebarItems from './SidebarItems';
import { logout } from "./login/actions";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://one.evergov.com/">
    evergov-adm
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 280;


const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
});

class OneDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sideBarOpen: true,
        }
        this.logout = this.logout.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }


    toggleSidebar() {

       const {dispatch} = this.props;
       this.setState({
         sideBarOpen: !this.state.sideBarOpen
       });
    }


    logout() {
        const { dispatch } = this.props;
        dispatch(logout())
    }

    render() {
          const {
            userDetailsLoading,
            userDetails,
            userDetailsLoadingFailed,
            isFirstTime,
            isBusiness,
            isIndividual,
            openSideBar,
            landingPlan,
            landingType
          } = this.props.oneUser;
          const {classes} = this.props;
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(
          classes.appBar,
          this.state.sideBarOpen && classes.appBarShift
        )}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={this.toggleSidebar}
            className={clsx(
              classes.menuButton,
              this.state.sideBarOpen && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Evergov Admin
          </Typography>
          <Button onClick={this.logout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !this.state.sideBarOpen && classes.drawerPaperClose
          )
        }}
        open={this.state.sideBarOpen}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={this.toggleSidebar}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <SidebarItems />
      </Drawer>
      <main className={classes.content}>
        <Container maxWidth="sm">
          <Router>
            <DashboardHome path="/" />
            <One path="/one/*" />
          </Router>
        </Container>

        <div className={classes.appBarSpacer} />

        <Copyright />
      </main>
    </div>
  );
}
}

const mapStateToProps = function (state, ownProps) {
    return {
        oneUser: state.oneUser,
        oneServices: state.oneServices
    };
};
export default connect(mapStateToProps)(withStyles(styles)(OneDashboard));

