import React, { Component, Fragment } from "react";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  progress: {
    margin: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  },
  table: {
    minWidth: 650
  },
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  }
});

class PlanList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { plans } = this.props;
    const { classes } = this.props;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Sers</TableCell>

                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {plans.map(row => (
                  <TableRow key={row.plan_id}>
                    <TableCell component="th" scope="row">
                      {row.pg_plan_id}
                    </TableCell>
                    <TableCell align="right">{row.pg_plan_name}</TableCell>
                    <TableCell align="right">
                      {row.sers.map((s, i) => `${s.sid},\n`)}
                    </TableCell>
                    <TableCell align="right">
                      <Fab
                        color="primary"
                        size="small"
                        onClick={() => this.props.onDelete(row.plan_id)}
                        aria-label="add"
                        className={classes.fab}
                      >
                        <DeleteIcon />
                      </Fab>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}


export default withStyles(styles)(PlanList);
