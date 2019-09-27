import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import { Router, Link } from "@reach/router";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  subscribeForUsers,
  unsubscribeForUsers,
  setUserDetail
} from "./actions";

import MUIDataTable from "mui-datatables";
const styles = theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  progress: {
    margin: theme.spacing(2)
  }
});

const columns = [
  {
    name: "uid",
    label: "uid"
  },
  {
    name: "email",
    label: "email"
  },
  {
    name: "paymentSetupDone",
    label: "paymentSetupDone"
  },
  {
    name: "plan",
    label: "plan"
  }
];


 
class UserList extends Component {
  constructor(props) {
    super(props);
    this.onRowClick = this.onRowClick.bind(this);
  }

  onRowClick(rowData, rowMeta) {
      const userId = rowData[0];
      const {dispatch} = this.props;
      const userData = {
        email: rowData[1],
        paymentSetupDone: rowData[2],
        name: 'Name',
        userType: 'Business',
        planType: 'plan',
        stripeCusLink: 'http://stripe.com',
      }
      dispatch(setUserDetail(userData));
      navigate(`/dashboard/one/user/${userId}`, {uid: userId});
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(subscribeForUsers());
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(unsubscribeForUsers());
  }

  render() {
    const { fetching, items, failure } = this.props;
    const { classes } = this.props;
    const options = {
        filterType: "dropdown",
        responsive: "scrollMaxHeight",
        onRowClick: this.onRowClick
    };

    if (fetching) {
      return <CircularProgress className={classes.progress} />;
    }

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MUIDataTable
            title={"User List"}
            data={items}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    ...state.admOneUserReducer
  };
};

export default connect(mapStateToProps)(withStyles(styles)(UserList));
