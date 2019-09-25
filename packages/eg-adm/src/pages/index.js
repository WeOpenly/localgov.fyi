import React, { Fragment } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MuiLink from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";
import Link from "../components/Link";
import Helmet from 'react-helmet';
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Grid from "@material-ui/core/Grid";

import FirebaseContext from '../common/firebase/context.js';

import getFirebse from '../common/firebase/firebase.js';
import { checkLogin} from '../components/actions';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <MuiLink color="inherit" href="https://one.evergov.com/">
   one-adm
      </MuiLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});



class AdmIndex extends React.Component {
    constructor(props) {
        super(props);
    }


    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(checkLogin())

    }


    render() {
        const { loginCheckInProgress } = this.props;

              const { classes } = this.props;


        return (
            <Fragment>
                <Helmet>
                    <title>{`Evergov One`}
                    </title>
                </Helmet>
                <FirebaseContext.Provider value={getFirebse}>
                  <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
Evergov Admin
        </Typography>

       
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Admin Sign In
          </Button>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>      
                </FirebaseContext.Provider>
            </Fragment>
        )
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state.oneUser
    };
};

export default connect(mapStateToProps)(withStyles(styles)(AdmIndex));
