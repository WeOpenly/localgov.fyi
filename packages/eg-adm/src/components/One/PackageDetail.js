import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import { Router, Link } from "@reach/router";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Formik, Form, Field, FieldArray } from "formik";
import { FormikTextField } from "formik-material-fields";
import TextField from "@material-ui/core/TextField";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Switch from "@material-ui/core/Switch";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import PlanList from "./PlanList";
import { subscribeForSers } from "./serActions";
import {
  fetchPackageDetail,
  editPackDetail,
  updateServicesInPackage,
  updatePlansInPackage
} from "./packActions";

const styles = theme => ({
  container: {
    padding: theme.spacing(2)
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  progress: {
    margin: theme.spacing(2)
  },
  card: {
    marginTop: theme.spacing(2),
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },

  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

class PackDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdd: false,
      newPlanSers: []
    };
    this.onAddClick = this.onAddClick.bind(this);
    this.editPackDetail = this.editPackDetail.bind(this);
    this.newPlanEdit = this.newPlanEdit.bind(this);
    this.upateNewPlanSers = this.upateNewPlanSers.bind(this);

    this.onNewPlanSubmit = this.onNewPlanSubmit.bind(this);
    this.updateServicesInPackage = this.updateServicesInPackage.bind(this);
    this.onPlanDelete = this.onPlanDelete.bind(this);
  }

  onPlanDelete(pId) {
    const { dispatch } = this.props;
    const { packData } = this.props.pack;
    const { plans } = packData;

    dispatch(updatePlansInPackage(this.props.packId, plans, pId, null));
  }

  upateNewPlanSers(ser){
    console.log(ser, this.state.newPlanSers);
    let newSers = this.state.newPlanSers;
    let contains = false;
    let exSers = newSers.filter((ns, i)=> ns.sid===ser.sid)
    
    if (exSers.length > 0){
      newSers = newSers.filter((ns, i) => ns.sid !== ser.sid);      
    } else {
      newSers.push(ser)
    }

    this.setState({
      newPlanSers: newSers
    });
  }

  onNewPlanSubmit() {
    const { dispatch } = this.props;
    const { packData } = this.props.pack;
    const { plans } = packData;
    const planData = {
      pg_plan_id: this.state.pg_plan_id,
      pg_plan_name: this.state.pg_plan_name,
      monthly_plan_price: this.state.monthly_plan_price,
      monthly_plan_id: this.state.monthly_plan_id,
      yearly_plan_price: this.state.yearly_plan_price,
      yearly_plan_id: this.state.yearly_plan_id,
      sers: this.state.newPlanSers
    };

    dispatch(
      updatePlansInPackage(
        this.props.packId,
        plans,
        this.state.plan_id,
        planData
      )
    );
    this.onAddClick();
  }

  newPlanEdit(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onAddClick() {
    this.setState({
      showAdd: !this.state.showAdd
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { fetching, items, failure } = this.props.ser;
    dispatch(fetchPackageDetail(this.props.packId));

    if (!fetching && items.lengh === 0) {
      dispatch(subscribeForSers());
    }
  }

  updateServicesInPackage(serId) {
    const { dispatch } = this.props;
    const { packData } = this.props.pack;

    dispatch(
      updateServicesInPackage(this.props.packId, packData.services, serId)
    );
  }

  editPackDetail(vals) {
    const { dispatch } = this.props;
    dispatch(editPackDetail(this.props.packId, vals));
  }

  render() {
    const { classes } = this.props;
    const { fetching, failure, packData } = this.props.pack;
    const { services, plans } = packData;



    if (!packData || Object.keys(packData).length === 0) {
      return null;
    }

    if (fetching) {
      return <CircularProgress className={classes.progress} />;
    }

    let allSers = null;
    if (!this.props.ser.fetching && this.props.ser.items.length > 0) {
      allSers = (
        <List
          subheader={<ListSubheader>Pick services</ListSubheader>}
          className={classes.root}
        >
          {this.props.ser.items.map((ser, idx) => (
            <ListItem>
              <ListItemText
                id="switch-list-label-wifi"
                primary={ser.name}
                secondary={ser.sid}
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  onChange={() => this.updateServicesInPackage(ser.sid)}
                  checked={services.indexOf(ser.sid) !== -1}
                  inputProps={{
                    "aria-labelledby": "switch-list-label-wifi"
                  }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      );
    }

    let packageSers = [];
    if (!this.props.ser.fetching && this.props.ser.items.length > 0) {

      packageSers = this.props.ser.items.filter(
        (ser, idx) => services.indexOf(ser.sid) !== -1
      );
    }


    let sersToAddtoPlan = [];
    if (packageSers.length > 0) {
      sersToAddtoPlan = (
        <List
          subheader={<ListSubheader>Pick services for this plan</ListSubheader>}
          className={classes.root}
        >
          {packageSers.map((ser, idx) => (
            <ListItem>
              <ListItemText
                id="switch-list-label-wifi"
                primary={ser.name}
                secondary={ser.sid}
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  onChange={() => this.upateNewPlanSers(ser)}
                  checked={this.state.newPlanSers.indexOf(ser) !== -1}
                  inputProps={{
                    "aria-labelledby": "switch-list-label-wifi"
                  }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      );
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
                {packData.pid}
              </Typography>
              <Typography variant="h5" component="h2">
                {packData.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.container}>
            <Typography variant="h5" component="h4">
              Services in this package
            </Typography>
            {allSers}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={this.onAddClick}
            className={classes.button}
          >
            Add Plan
          </Button>
          <Dialog
            open={this.state.showAdd}
            onClose={this.onAddClick}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add New Plan</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="pg_plan_id"
                name="pg_plan_id"
                label="Distinct ID"
                onChange={this.newPlanEdit}
                type="text"
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="pg_plan_name"
                name="pg_plan_name"
                label="Display Plan Name"
                onChange={this.newPlanEdit}
                type="text"
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="monthly_plan_price"
                name="monthly_plan_price"
                label="Monthly Stripe Plan Price (Dollars)"
                onChange={this.newPlanEdit}
                type="number"
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="monthly_plan_id"
                name="monthly_plan_id"
                label="Monthly Stripe Plan ID"
                onChange={this.newPlanEdit}
                type="text"
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="yearly_plan_price"
                name="yearly_plan_price"
                label="Yearly Stripe Plan Price (Dollars)"
                onChange={this.newPlanEdit}
                type="number"
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="yearly_plan_id"
                name="yearly_plan_id"
                label="Yearly Stripe Plan ID"
                onChange={this.newPlanEdit}
                type="text"
                fullWidth
              />

              <Paper className={classes.container}>{sersToAddtoPlan}</Paper>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.onAddClick} color="primary">
                Cancel
              </Button>
              <Button onClick={this.onNewPlanSubmit} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.container}>
            <Typography variant="h5" component="h4">
              Plans in this package
            </Typography>
            <PlanList plans={plans} onDelete={this.onPlanDelete} />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    pack: state.admOnePackDetailReducer,
    ser: state.admOneSerReducer
  };
};

export default connect(mapStateToProps)(withStyles(styles)(PackDetail));
