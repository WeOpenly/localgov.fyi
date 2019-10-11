import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import { Router, Link } from "@reach/router";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import UserServiceList from "./UserServiceList";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import SerListAutoComplete from "./SerListAutoComplete";
import {
  getUserServiceDetails,
  setUserDetail,
  submitNewServiceDetails
} from "./actions";



const styles = theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  progress: {
    margin: theme.spacing(2)
  },
  card: {
    marginTop:  theme.spacing(2),
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});


class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdd: false,
      selectedSer: {},
    };
    this.onAddClick = this.onAddClick.bind(this);
    this.newSerFieldEdit = this.newSerFieldEdit.bind(this);
    this.onNewSubmit = this.onNewSubmit.bind(this);
    this.onSelectSer = this.onSelectSer.bind(this);
  }

  newSerFieldEdit(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSelectSer(ser){
    console.log(ser);
    this.setState({
      selectedSer: ser
    })
  }

  onAddClick() {
    this.setState({
      showAdd: !this.state.showAdd
    });
  }

  onNewSubmit() {
    const { dispatch, userId } = this.props;
    const selectedSer = this.state.selectedSer.sid;
    const formData = this.state.formData;

    console.log(selectedSer, formData);
    dispatch(submitNewServiceDetails(userId, selectedSer, formData));
    this.onAddClick();
  }

  componentDidMount() {
    const { dispatch, } = this.props;
    console.log(this.props.userId, "mount");
    dispatch(getUserServiceDetails(this.props.userId));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
  }

  render() {
    const { serDetails, userId, classes } = this.props;
    const { fetching, userData, services, failure } = serDetails;

    if (fetching) {
      return <CircularProgress className={classes.progress} />;
    }

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {userData.email}
              </Typography>
              <Typography variant="h5" component="h2">
                {userData.name}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {userData.type}
              </Typography>
              <Typography variant="body2" component="p">
                {userData.selectedPlan}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">
                <a href={userData.stripe_cus_link} target="_blank">
                  {" "}
                  Stripe Profile
                </a>
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={this.onAddClick}
            className={classes.button}
          >
            Add User Service Details
          </Button>
          <Dialog
            maxWidth="md"
            fullWidth={true}
            open={this.state.showAdd}
            onClose={this.onAddClick}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              Add User Service Details
            </DialogTitle>
            <DialogContent>
              <SerListAutoComplete onSelectSer={this.onSelectSer} />
              <TextField
                autoFocus
                margin="dense"
                id="formData"
                name="formData"
                label="Service form data"
                onChange={this.newSerFieldEdit}
                type="text"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onAddClick} color="primary">
                Cancel
              </Button>
              <Button onClick={this.onNewSubmit} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Grid item xs={12}>
          {services ? (
            <UserServiceList services={services} uid={userId} />
          ) : null}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
  
    serDetails: state.admOneUserSerReducer
  };
};

export default connect(mapStateToProps)(withStyles(styles)(UserDetail));
